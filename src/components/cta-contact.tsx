import { MessageSquareText, Phone, UserRound } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

/**
 * "Get a free estimate" pill plus the free-quote phone line. Used by the
 * header and the about section, which previously carried two copies of this
 * markup.
 */
export function CtaContact({
  size = 'default',
  className,
  detailsClassName,
}: {
  size?: 'default' | 'lg'
  className?: string
  /** Lets the header drop the phone block where the row runs out of room. */
  detailsClassName?: string
}) {
  const large = size === 'lg'

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-center gap-x-4 gap-y-3',
        className,
      )}
    >
      <Button asChild variant="accent" size={large ? 'pill-lg' : 'pill'}>
        <a href="#contact">
          <MessageSquareText aria-hidden />
          GET A FREE ESTIMATE
        </a>
      </Button>
      <div
        className={cn(
          'leading-tight whitespace-nowrap',
          large ? 'text-lg' : 'text-sm',
          detailsClassName,
        )}
      >
        <p className="flex items-center gap-1.5 font-semibold text-white">
          <UserRound
            className="size-4 shrink-0"
            strokeWidth={2.5}
            aria-hidden
          />
          Free quote
        </p>
        <a
          href={site.phone.href}
          className="ease-soft hover:text-accent-300 flex items-center gap-1.5 font-semibold text-white transition-colors duration-200"
        >
          <Phone className="size-4 shrink-0" strokeWidth={2.5} aria-hidden />
          {site.phone.display}
        </a>
      </div>
    </div>
  )
}
