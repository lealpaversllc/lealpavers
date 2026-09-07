import { Mail, PhoneCall } from 'lucide-react'

import { site } from '@/data/site'
import { cn } from '@/lib/utils'

export function ContactInfo({ className }: { className?: string }) {
  return (
    <ul className={cn('space-y-3', className)}>
      <li>
        <a
          href={`mailto:${site.email}`}
          className="ease-soft hover:text-accent-300 inline-flex items-center gap-2 rounded-sm transition-colors duration-200"
        >
          <Mail className="size-5 shrink-0" aria-hidden />
          {site.email}
        </a>
      </li>
      <li>
        <a
          href={site.phone.href}
          className="ease-soft hover:text-accent-300 inline-flex items-center gap-2 rounded-sm transition-colors duration-200"
        >
          <PhoneCall className="size-5 shrink-0" aria-hidden />
          {site.phone.display}
        </a>
      </li>
    </ul>
  )
}
