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
import {
  mkdir,
  readdir,
  readFile,
  rename,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises'
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
  // Superseded by the firepit / water-feature / pool slides.
  /hero\/(mobile\/)?0[123]\./,
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

/**
 * The desktop hero slides are parallelograms, not rectangles: the carousel
 * stacks them with a horizontal offset and the slanted edges are what makes
 * the diagonal cut. Measured off the original artwork (800x627, top edge
 * inset 180..775, bottom edge 25..620) and expressed as fractions so it
 * survives a resize. The mobile slides are full-bleed rectangles.
 */
const SLANTED = /hero\/(?!mobile\/)(firepit|water-feature|pool)\./

const SLANT = {
  topLeft: 0.225,
  topRight: 0.96875,
  bottomLeft: 0.03125,
  bottomRight: 0.775,
}

function slantMask(width, height) {
  const x = (fraction) => Math.round(width * fraction)
  const points = [
    `${x(SLANT.topLeft)},0`,
    `${x(SLANT.topRight)},0`,
    `${x(SLANT.bottomRight)},${height}`,
    `${x(SLANT.bottomLeft)},${height}`,
  ].join(' ')
  return Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
       <polygon points="${points}" fill="#fff"/>
     </svg>`,
  )
}

/**
 * Service cards are 400px tall but only ~282px wide on desktop, so a
 * landscape gallery photo has to be scaled up ~1.85x by `object-cover` to
 * fill them — which is what made the covers look soft. Cards therefore get
 * their own square crop, sized for a 2x screen.
 */
const COVER_SIZE = 1100
const COVER_SUFFIX = '-cover.webp'
/** Sources that exist only to be card covers: no full-size version is published. */
const COVER_ONLY = /services\/root\//
const SERVICES_DATA = 'src/data/services.ts'

/**
 * src/data/services.ts stays the single source of truth: every `cover:`
 * ending in `-cover.webp` is rendered from the gallery photo of the same
 * name, so changing a cover in the data file is all that is needed.
 */
async function buildCovers(sources) {
  const data = await readFile(SERVICES_DATA, 'utf8')
  const urls = [...data.matchAll(/cover:\s*'([^']+-cover\.webp)'/g)].map(
    (match) => match[1],
  )

  let total = 0

  for (const url of urls) {
    const rel = url.replace(/^\//, '')
    const base = rel.slice(0, -COVER_SUFFIX.length)
    const source = sources.find(
      (file) => relative(SOURCE, file).replace(RASTER, '') === base,
    )
    if (!source) throw new Error(`No source image for cover ${url}`)

    const target = join(PUBLIC, rel)
    await mkdir(dirname(target), { recursive: true })
    await sharp(source)
      // Centre, not 'attention': the entropy crop wandered off the subject
      // (it framed the Retaining Wall card on the pool screen behind it).
      .resize(COVER_SIZE, COVER_SIZE, { fit: 'cover', position: 'centre' })
      .webp({ quality: 78, effort: 6 })
      .toFile(target)

    const size = (await stat(target)).size
    total += size
    console.log(`${rel.padEnd(48)} ${kb(size).padStart(18)}  (cover)`)
  }

  return total
}

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

    // The Open Graph image is composed by generate-og.mjs from this source,
    // so it is neither converted to WebP nor copied across as-is.
    if (rel === 'og.png') continue

    if (COVER_ONLY.test(rel)) continue

    const target = join(PUBLIC, rel).replace(RASTER, '.webp')
    await mkdir(dirname(target), { recursive: true })

    const { box, quality = 80 } = ruleFor(rel)

    let pipeline = sharp(source).resize({
      width: box[0],
      height: box[1],
      fit: 'inside',
      withoutEnlargement: true,
    })

    if (SLANTED.test(rel)) {
      const { width, height } = await pipeline
        .clone()
        .toBuffer({
          resolveWithObject: true,
        })
        .then((r) => r.info)
      pipeline = pipeline
        .ensureAlpha()
        .composite([{ input: slantMask(width, height), blend: 'dest-in' }])
    }

    await pipeline.webp({ quality, effort: 6 }).toFile(target)

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

  after += await buildCovers(sources)

  await writeFile(
    join(SOURCE, 'README.md'),
    '# Original imagery\n\nUncompressed sources for `public/assets`. Gitignored: keep a backup.\nRegenerate `public/` with `node scripts/optimize-images.mjs`.\n',
  )

  console.log(`\nTotal: ${kb(before)} -> ${kb(after)}`)
}

main()
