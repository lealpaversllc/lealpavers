/**
 * Builds the 1200x630 Open Graph image: the brand lockup (mark, wordmark and
 * tagline) centred on the cream from the brand deck. The source is a square
 * export with generous margins, so it is trimmed to its content first and
 * then fitted with an even margin on every side.
 *
 *   node scripts/generate-og.mjs
 */
import sharp from 'sharp'

const LOCKUP = 'assets-source/og.png'
const OUT = 'public/og.png'

const W = 1200
const H = 630

// Sampled from the lockup export so the canvas and the artwork match.
const CREAM = { r: 250, g: 243, b: 233 }

const MARGIN = 56

const lockup = await sharp(LOCKUP)
  .trim({ threshold: 12 })
  .resize({
    width: W - MARGIN * 2,
    height: H - MARGIN * 2,
    fit: 'inside',
  })
  .png()
  .toBuffer()

const { width, height } = await sharp(lockup).metadata()

await sharp({
  create: { width: W, height: H, channels: 3, background: CREAM },
})
  .composite([
    {
      input: lockup,
      top: Math.round((H - height) / 2),
      left: Math.round((W - width) / 2),
    },
  ])
  .png({ compressionLevel: 9, palette: true })
  .toFile(OUT)

console.log(`${OUT} ${W}x${H}`)
