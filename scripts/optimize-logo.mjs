/**
 * The logo SVG carries two embedded PNGs (~120KB) and is loaded on every page
 * in three places. This re-encodes them in place, keeping PNG so the file
 * renders everywhere an SVG does.
 *
 *   node scripts/optimize-logo.mjs
 */
import { existsSync } from 'node:fs'
import { copyFile, readFile, stat, writeFile } from 'node:fs/promises'

import sharp from 'sharp'

const FILE = 'public/assets/logo.svg'
const BACKUP = 'assets-source/logo.original.svg'

const kb = async (p) => `${Math.round((await stat(p)).size / 1024)}KB`

if (!existsSync(BACKUP)) await copyFile(FILE, BACKUP)

const before = await kb(FILE)
let svg = await readFile(BACKUP, 'utf8')

const pattern = /data:image\/png;base64,([A-Za-z0-9+/=]+)/g
const matches = [...svg.matchAll(pattern)]

for (const [full, payload] of matches) {
  const optimized = await sharp(Buffer.from(payload, 'base64'))
    .png({ compressionLevel: 9, effort: 10, palette: true, quality: 90 })
    .toBuffer()
  const replacement = `data:image/png;base64,${optimized.toString('base64')}`
  if (replacement.length < full.length) svg = svg.replace(full, replacement)
}

await writeFile(FILE, svg)
console.log(
  `logo.svg  ${before} -> ${await kb(FILE)}  (${matches.length} embedded rasters)`,
)
