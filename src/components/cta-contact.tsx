import { MessageSquareText, Phone, UserRound } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

/**
 * "Contact" pill plus the free-quote phone line. Used by the header and the
 * about section, which previously carried two copies of this markup.
 */
export function CtaContact({
  size = 'default',
  className,
}: {
  size?: 'default' | 'lg'
  className?: string
}) {
  const large = size === 'lg'

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <Button asChild variant="accent" size={large ? 'pill-lg' : 'pill'}>
        <a href="#contact">
          <MessageSquareText aria-hidden />
          Contact
        </a>
      </Button>
      <div className={cn('leading-tight', large ? 'text-lg' : 'text-sm')}>
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
