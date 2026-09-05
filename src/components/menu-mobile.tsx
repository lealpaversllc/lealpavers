'use client'

import { ContactInfo } from '@/components/contact-info'
import { SocialLinks } from '@/components/social-links'
import { Button } from '@/components/ui/button'
import { site } from '@/data/site'

export function MenuMobile({
  open,
  onNavigate,
}: {
  open: boolean
  onNavigate: () => void
}) {
  return (
    <div
      id="mobile-menu"
      hidden={!open}
      className="bg-brand-600 fixed inset-x-0 top-[var(--header-h)] bottom-0 overflow-y-auto md:hidden"
    >
      <div className="container flex min-h-full flex-col justify-between gap-10 py-8">
        <nav aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={onNavigate}
                  className="ease-soft hover:text-accent-300 block rounded-md py-3 text-2xl font-semibold text-white transition-colors duration-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-8 pb-8">
          <Button asChild variant="accent" size="pill-lg" className="w-full">
            <a href="#contact" onClick={onNavigate}>
              Get a free quote
            </a>
          </Button>

          <div className="space-y-3">
            <h2 className="text-eyebrow text-accent-300 uppercase">
              Follow us
            </h2>
            <SocialLinks />
          </div>

          <div className="space-y-3 text-white">
            <h2 className="text-eyebrow text-accent-300 uppercase">
              Get in touch
            </h2>
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  )
}
