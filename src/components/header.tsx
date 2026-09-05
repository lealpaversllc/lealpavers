'use client'

import { AlignJustify, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { BrandLogo } from '@/components/brand-logo'
import { CtaContact } from '@/components/cta-contact'
import { MenuMobile } from '@/components/menu-mobile'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <>
      <header
        id="nav-bar"
        className={cn(
          'bg-brand-600 ease-soft fixed inset-x-0 top-0 z-50 transition-shadow duration-300',
          scrolled && 'shadow-brand-900/25 shadow-lg',
        )}
      >
        <div className="container flex h-[var(--header-h)] items-center justify-between gap-4">
          <a href="#home" aria-label={`${site.name} — back to top`}>
            <BrandLogo
              width={105}
              priority
              tone="light"
              className="w-[92px] md:w-[105px]"
            />
          </a>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-3 lg:gap-5">
              {site.nav.map((item, index) => (
                <li
                  key={item.href}
                  className="flex items-center gap-3 lg:gap-5"
                >
                  {index > 0 ? (
                    <span
                      aria-hidden
                      className="bg-accent-500 size-[5px] rounded-full"
                    />
                  ) : null}
                  <a
                    href={item.href}
                    className="ease-soft hover:text-accent-300 rounded-sm px-1 py-1 text-white transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <CtaContact className="hidden md:flex" />

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="ease-soft -mr-2 rounded-md p-2 text-white transition-colors duration-200 hover:bg-white/10 md:hidden"
          >
            {open ? (
              <X strokeWidth={2.5} size={24} aria-hidden />
            ) : (
              <AlignJustify strokeWidth={2.5} size={24} aria-hidden />
            )}
          </button>
        </div>

        <MenuMobile open={open} onNavigate={() => setOpen(false)} />
      </header>

      {/* Keeps the fixed header from covering the top of the hero. */}
      <div aria-hidden className="bg-brand-600 h-[var(--header-h)]" />
    </>
  )
}
