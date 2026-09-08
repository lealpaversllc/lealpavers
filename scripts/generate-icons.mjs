/**
 * Builds the favicon and square app icons (PWA manifest + apple touch icon)
 * from the paver "L" mark, centred on the brand cream.
 *
 *   node scripts/generate-icons.mjs
 */
import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import sharp from 'sharp'

const MARK = 'assets-source/favicon.png'
// The mark is brand navy, so it sits on the cream ground, not the navy one.
const BRAND = '#fefcf6'

/** Renders the mark centred on a `size` square of brand cream. */
async function icon(size) {
  const pad = Math.round(size * 0.08)
  const mark = await sharp(MARK)
    .trim()
    .resize({ width: size - pad * 2, height: size - pad * 2, fit: 'inside' })
    .png()
    .toBuffer()

  return sharp({
    create: { width: size, height: size, channels: 4, background: BRAND },
  })
    .composite([{ input: mark, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toBuffer()
}

const SIZES = [
  { file: 'public/icon-192.png', size: 192 },
  { file: 'public/icon-512.png', size: 512 },
  { file: 'public/apple-icon.png', size: 180 },
]

for (const { file, size } of SIZES) {
  await sharp(await icon(size)).toFile(file)
  console.log(`${file} ${size}x${size}`)
}

// Multi-resolution .ico for legacy browsers and bookmark bars. Frames are stored
// uncompressed, so the larger sizes are left to the PNG icons above.
const ICO_SIZES = [16, 32, 48, 64]
const work = mkdtempSync(join(tmpdir(), 'favicon-'))
try {
  const frames = []
  for (const size of ICO_SIZES) {
    const frame = join(work, `${size}.png`)
    await sharp(await icon(size)).toFile(frame)
    frames.push(frame)
  }
  execFileSync('magick', [...frames, 'src/app/favicon.ico'])
  console.log(`src/app/favicon.ico ${ICO_SIZES.join(',')}`)
} finally {
  rmSync(work, { recursive: true, force: true })
}
