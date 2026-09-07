import Image from 'next/image'

import { site } from '@/data/site'
import { cn } from '@/lib/utils'

export function SocialLinks({
  className,
  iconClassName,
}: {
  className?: string
  iconClassName?: string
}) {
  return (
    <ul className={cn('flex items-center gap-4', className)}>
      {site.socials.map((social) => (
        <li key={social.name}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${site.name} on ${social.name}`}
            className="ease-soft inline-flex rounded-full p-1 transition-opacity duration-200 hover:opacity-75"
          >
            <Image
              src={social.icon}
              alt=""
              aria-hidden
              width={25}
              height={25}
              className={cn('size-6', iconClassName)}
            />
          </a>
        </li>
      ))}
    </ul>
  )
}
