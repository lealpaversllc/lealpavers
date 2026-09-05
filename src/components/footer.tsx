import { BrandLogo } from '@/components/brand-logo'
import { ContactInfo } from '@/components/contact-info'
import { SocialLinks } from '@/components/social-links'
import { site } from '@/data/site'

export function Footer() {
  return (
    <footer className="bg-brand-600 w-full text-white">
      <div className="container py-12">
        <div className="grid gap-8 divide-y divide-white/20 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-y-0">
          <div className="space-y-4 pb-8 sm:pr-8 sm:pb-0">
            <h2 className="text-eyebrow text-accent-500 uppercase">
              Follow us
            </h2>
            <SocialLinks />
          </div>

          <div className="space-y-4 pt-8 sm:px-8 sm:pt-0">
            <h2 className="text-eyebrow text-accent-500 uppercase">
              Get in touch
            </h2>
            <ContactInfo />
          </div>

          <nav aria-label="Footer" className="space-y-4 pt-8 sm:pt-0 sm:pl-8">
            <h2 className="text-eyebrow text-accent-500 uppercase">
              Quick links
            </h2>
            <ul className="flex flex-col gap-2">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="ease-soft hover:text-accent-500 rounded-sm transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center gap-2">
          <BrandLogo
            tone="light"
            width={236}
            className="w-[180px] sm:w-[236px]"
          />
          <p className="text-sm text-white/80">
            Copyright © {new Date().getFullYear()}{' '}
            <span className="text-accent-500">{site.legalName}</span>. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
