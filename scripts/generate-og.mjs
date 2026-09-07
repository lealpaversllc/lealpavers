/**
 * Builds the 1200x630 Open Graph image: a project photo under a brand scrim
 * with the wordmark. Text is drawn from the logo asset rather than a system
 * font so the output is identical on any machine.
 *
 *   node scripts/generate-og.mjs
 */
import sharp from 'sharp'

const PHOTO = 'assets-source/assets/services/driveway-and-walkway/01.jpeg'
const LOGO = 'public/assets/logo-light.svg'
const OUT = 'public/og.png'

const W = 1200
const H = 630

const PANEL = 560

// The light lockup on a navy panel, mirroring the brand deck.
const panel = Buffer.from(
  `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
     <rect width="${PANEL}" height="${H}" fill="#1F394A"/>
     <rect x="${PANEL}" y="0" width="12" height="${H}" fill="#B08A2A"/>
   </svg>`,
)

// Keeps the photo readable without competing with the panel.
const warmth = Buffer.from(
  `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
     <rect width="${W}" height="${H}" fill="#101820" fill-opacity="0.18"/>
   </svg>`,
)

const logo = await sharp(LOGO, { density: 600 })
  .resize({ width: 424, fit: 'inside' })
  .png()
  .toBuffer()

const { height: logoHeight } = await sharp(logo).metadata()

await sharp(PHOTO)
  .resize(W, H, { fit: 'cover', position: 'attention' })
  .composite([
    { input: warmth, top: 0, left: 0 },
    { input: panel, top: 0, left: 0 },
    { input: logo, top: Math.round((H - logoHeight) / 2), left: 68 },
  ])
  .png({ compressionLevel: 9, palette: true })
  .toFile(OUT)

console.log(`${OUT} ${W}x${H}`)
