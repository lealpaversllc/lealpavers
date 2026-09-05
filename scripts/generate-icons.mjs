/**
 * Builds the square app icons (PWA manifest + apple touch icon) from the
 * wordmark, centred on the brand red.
 *
 *   node scripts/generate-icons.mjs
 */
import sharp from 'sharp'

const LOGO = 'public/assets/logo.svg'
const BRAND = '#961914'

const SIZES = [
  { file: 'public/icon-192.png', size: 192 },
  { file: 'public/icon-512.png', size: 512 },
  { file: 'public/apple-icon.png', size: 180 },
]

for (const { file, size } of SIZES) {
  const pad = Math.round(size * 0.14)
  const mark = await sharp(LOGO, { density: 600 })
    .resize({ width: size - pad * 2, fit: 'inside' })
    .png()
    .toBuffer()

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: BRAND,
    },
  })
    .composite([{ input: mark, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile(file)

  console.log(`${file} ${size}x${size}`)
}
