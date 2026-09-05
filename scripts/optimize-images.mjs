/**
 * Resizes and converts the site imagery to WebP.
 *
 * Originals are moved once into `assets-source/` (gitignored) and every run
 * regenerates `public/` from there, so the script is idempotent and the
 * originals are never destroyed by a re-run.
 *
 *   node scripts/optimize-images.mjs
 */
import { existsSync } from 'node:fs'
import { mkdir, readdir, rename, rm, stat, writeFile } from 'node:fs/promises'
import { dirname, join, relative } from 'node:path'

import sharp from 'sharp'

const SOURCE = 'assets-source'
const PUBLIC = 'public'
const RASTER = /\.(png|jpe?g)$/i

/**
 * Originals kept in the archive but no longer published: they belong to the
 * previous red identity. Without this the script keeps resurrecting them.
 */
const RETIRED = [
  /hero\/background-red\./,
  /hero\/staircase-on-logo\./,
  /hero\/rating(-mobile)?\./,
]

/**
 * Output budget per area. Both dimensions are capped (`fit: inside`) so a
 * portrait photo does not blow up to 1600x2844 when only width is limited.
 */
const RULES = [
  // Full-bleed background behind the contact form.
  { match: /hero\/contact-bg\./, box: [1920, 1200], quality: 72 },
  // Photo beside the contact form, rendered at 598px.
  { match: /hero\/contact\./, box: [1200, 1200] },
  // Repeating red texture behind the hero.
  { match: /hero\/background-red\./, box: [1920, 800] },
  // Card layered over the hero logo, rendered at 377px.
  { match: /hero\/staircase-on-logo\./, box: [754, 520] },
  // Hero slides, rendered in an 800px stage.
  { match: /hero\//, box: [1000, 1000] },
  // Before/after comparisons, at most ~640px wide on mobile.
  { match: /before-after\//, box: [1280, 1280] },
  // Service card covers, rendered at most ~640px wide.
  { match: /services\/root\//, box: [1000, 1000], quality: 78 },
  // Service galleries inside the sheet, up to ~700px wide.
  { match: /services\//, box: [1280, 1280], quality: 74 },
]

const ruleFor = (path) =>
  RULES.find((r) => r.match.test(path)) ?? { box: [1600, 1600] }

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const out = []
  for (const entry of entries) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(path)))
    else out.push(path)
  }
  return out
}

/** First run only: move the originals out of `public/`. */
async function stageOriginals() {
  if (existsSync(SOURCE)) return
  console.log(`Moving originals into ${SOURCE}/ …`)
  const files = (await walk(PUBLIC)).filter((f) => RASTER.test(f))
  for (const file of files) {
    const target = join(SOURCE, relative(PUBLIC, file))
    await mkdir(dirname(target), { recursive: true })
    await rename(file, target)
  }
}

const kb = (bytes) => `${Math.round(bytes / 1024)}KB`

async function main() {
  await stageOriginals()

  const sources = (await walk(SOURCE))
    .filter((f) => RASTER.test(f))
    .filter((f) => !RETIRED.some((pattern) => pattern.test(f)))
  let before = 0
  let after = 0

  for (const source of sources) {
    const rel = relative(SOURCE, source)

    // The Open Graph image has to stay a PNG: WhatsApp and Facebook do not
    // reliably render WebP previews. 1200x630 is the expected ratio.
    if (rel === 'og.png') {
      const target = join(PUBLIC, rel)
      await sharp(source)
        .resize(1200, 630, { fit: 'cover' })
        .png({ compressionLevel: 9, palette: true })
        .toFile(target)
      before += (await stat(source)).size
      after += (await stat(target)).size
      console.log(`og.png -> 1200x630`)
      continue
    }

    const target = join(PUBLIC, rel).replace(RASTER, '.webp')
    await mkdir(dirname(target), { recursive: true })

    const { box, quality = 80 } = ruleFor(rel)

    await sharp(source)
      .resize({
        width: box[0],
        height: box[1],
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality, effort: 6 })
      .toFile(target)

    const sourceSize = (await stat(source)).size
    const targetSize = (await stat(target)).size
    before += sourceSize
    after += targetSize
    console.log(
      `${rel.padEnd(48)} ${kb(sourceSize).padStart(7)} -> ${kb(targetSize).padStart(6)}`,
    )

    // Drop the stale original from public/ if it is still sitting there.
    const stale = join(PUBLIC, rel)
    if (existsSync(stale)) await rm(stale)
  }

  await writeFile(
    join(SOURCE, 'README.md'),
    '# Original imagery\n\nUncompressed sources for `public/assets`. Gitignored: keep a backup.\nRegenerate `public/` with `node scripts/optimize-images.mjs`.\n',
  )

  console.log(`\nTotal: ${kb(before)} -> ${kb(after)}`)
}

main()
