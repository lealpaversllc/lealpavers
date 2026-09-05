/**
 * Builds the light lockup of the logo for navy surfaces.
 *
 * The brand deck shows the wordmark in cream with the "PAVERS" gradient and
 * the strapline in light taupe. logo.svg is fully editable — five navy paths,
 * eighteen near-black paths, six gradients and two embedded PNG masks — so
 * the light version is derived rather than faked with a CSS filter.
 *
 *   node scripts/generate-logo-light.mjs
 */
import { readFile, writeFile } from 'node:fs/promises'

import sharp from 'sharp'

const SOURCE = 'public/assets/logo.svg'
const TARGET = 'public/assets/logo-light.svg'

const NAVY = 'rgb(31,56,74)'
const INK = 'rgb(37,35,36)'

const CREAM = 'rgb(251,245,231)' // #FBF5E7 — "LEAL" and the L mark
const STRAPLINE = 'rgb(208,200,184)' // #D0C8B8 — "& LANDSCAPING DESIGN"
const GRADIENT_DARK = 'rgb(110,105,95)' // #6E695F — keeps depth in "PAVERS"

/** Repaints a flat mask PNG, keeping its alpha channel. */
async function recolour(base64, hex) {
  const input = Buffer.from(base64, 'base64')
  const { width, height } = await sharp(input).metadata()
  const alpha = await sharp(input).extractChannel('alpha').toBuffer()
  const out = await sharp({
    create: { width, height, channels: 3, background: hex },
  })
    .joinChannel(alpha)
    .png({ compressionLevel: 9 })
    .toBuffer()
  return out.toString('base64')
}

let svg = await readFile(SOURCE, 'utf8')

// The gradients carry the same ink value as the strapline, so they are
// rewritten first and separately.
svg = svg.replace(/<linearGradient[\s\S]*?<\/linearGradient>/g, (block) =>
  block.split(INK).join(GRADIENT_DARK),
)

svg = svg.split(NAVY).join(CREAM).split(INK).join(STRAPLINE)

// The grid inside the L is a slate mask; on navy it needs to read as a warm
// tint of the cream mark. The four pavers under it lighten to match.
const masks = [
  { id: '_Image2', hex: '#8f897e' },
  { id: '_Image9', hex: '#c9c2b4' },
]

for (const { id, hex } of masks) {
  const pattern = new RegExp(
    `(<image id="${id}"[^>]*?xlink:href="data:image/png;base64,)([^"]+)(")`,
  )
  const match = svg.match(pattern)
  if (!match) throw new Error(`${id} not found in ${SOURCE}`)
  svg = svg.replace(pattern, `$1${await recolour(match[2], hex)}$3`)
}

await writeFile(TARGET, svg)
console.log(`${TARGET} written`)
