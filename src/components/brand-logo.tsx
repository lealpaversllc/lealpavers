import Image from 'next/image'

import { site } from '@/data/site'
import { cn } from '@/lib/utils'

export function BrandLogo({
  className,
  width = 236,
  priority = false,
  tone = 'brand',
}: {
  className?: string
  width?: number
  priority?: boolean
  /**
   * The wordmark is dark navy, which nearly disappears on the brand red.
   * `light` renders it as a solid white mono lockup for dark surfaces.
   */
  tone?: 'brand' | 'light'
}) {
  return (
    <Image
      src="/assets/logo.svg"
      alt={`${site.legalName} logo`}
      width={width}
      height={Math.round((width * 530) / 1312)}
      priority={priority}
      className={cn(
        'h-auto',
        tone === 'light' && 'brightness-0 invert',
        className,
      )}
    />
  )
}
