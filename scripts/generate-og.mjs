/**
 * Builds the 1200x630 Open Graph image: a project photo under a brand scrim
 * with the wordmark. Text is drawn from the logo asset rather than a system
 * font so the output is identical on any machine.
 *
 *   node scripts/generate-og.mjs
 */
import sharp from 'sharp'

const PHOTO = 'assets-source/assets/services/driveway-and-walkway/01.jpeg'
const LOGO = 'public/assets/logo.svg'
const OUT = 'public/og.png'

const W = 1200
const H = 630

const PANEL = 560

// The wordmark is dark navy: it needs a light panel, not a red scrim.
const panel = Buffer.from(
  `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
     <rect width="${PANEL}" height="${H}" fill="#FAF9F7"/>
     <rect x="${PANEL}" y="0" width="12" height="${H}" fill="#F5D53E"/>
   </svg>`,
)

// Keeps the photo readable without competing with the panel.
const warmth = Buffer.from(
  `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
     <rect width="${W}" height="${H}" fill="#3F0C09" fill-opacity="0.18"/>
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
