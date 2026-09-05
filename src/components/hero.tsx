'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState } from 'react'

import { BrandLogo } from '@/components/brand-logo'
import { heroSlides } from '@/data/projects'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

/** Horizontal offset of each slide relative to the active one. */
const OFFSETS = ['0%', '40%', '80%']

export function Hero() {
  const [current, setCurrent] = useState(0)
  const count = heroSlides.length

  const go = (delta: number) =>
    setCurrent((index) => (index + delta + count) % count)

  return (
    <section
      id="home"
      className="bg-brand-600 relative w-full bg-[url(/assets/hero/background-red.webp)] bg-cover bg-no-repeat shadow-md"
    >
      <div className="relative h-[27rem] w-full overflow-hidden sm:h-[39rem]">
        {/* Slide stage */}
        <div className="absolute top-0 left-1/2 z-10 h-full w-[800px] max-w-none -translate-x-1/2">
          {heroSlides.map((slide, index) => {
            const position = (index - current + count) % count
            return (
              <motion.div
                key={slide.desktop}
                className="absolute inset-0"
                style={{ zIndex: count - position }}
                animate={{ x: OFFSETS[position] ?? '80%' }}
                initial={false}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden={position !== 0}
              >
                {/* Art direction (portrait crop on phones) needs <picture>,
                    which next/image cannot express. The sources are already
                    resized and encoded by scripts/optimize-images.mjs. */}
                <picture>
                  <source media="(min-width: 768px)" srcSet={slide.desktop} />
                  <img
                    src={slide.mobile}
                    alt={slide.alt}
                    width={800}
                    height={627}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    className="h-full w-full object-cover"
                  />
                </picture>
              </motion.div>
            )
          })}
        </div>

        <div
          aria-hidden
          className="from-brand-900/85 via-brand-900/30 absolute inset-0 z-10 bg-gradient-to-r to-transparent"
        />

        {/* Overlay */}
        <div className="absolute inset-0 z-20">
          <div className="relative container h-full">
            <div className="absolute bottom-5 left-5 z-10 flex flex-col gap-6 sm:left-8 xl:left-10">
              <span
                aria-hidden
                className="hidden h-[162px] w-[236px] rounded-tl-2xl rounded-tr-2xl rounded-br-2xl bg-[url(/assets/hero/staircase-on-logo.webp)] bg-cover md:block xl:h-[260px] xl:w-[377px]"
              />
              <div className="space-y-3">
                <h1 className="text-h1 font-extrabold text-white">
                  &ldquo;Your space,
                  <br />
                  our art&rdquo;
                </h1>
                <p className="text-accent-500 sr-only text-sm font-semibold md:not-sr-only">
                  Paver installation &amp; landscaping design in{' '}
                  {site.area.label}
                </p>
              </div>
              <BrandLogo
                tone="light"
                width={236}
                className="w-[150px] xl:w-[236px]"
              />
            </div>

            <div className="absolute right-5 bottom-5 z-10 flex items-center gap-4 sm:right-8 xl:right-10">
              <div className="flex items-center gap-2">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.desktop}
                    type="button"
                    onClick={() => setCurrent(index)}
                    aria-label={`Show project ${index + 1} of ${count}`}
                    aria-current={index === current}
                    className={cn(
                      'ease-soft size-3 rounded-full border border-white transition-colors duration-200',
                      index === current
                        ? 'bg-accent-500'
                        : 'bg-white/25 hover:bg-white/50',
                    )}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous project"
                  className="ease-soft flex size-11 items-center justify-center rounded-full border border-white/50 bg-white/20 text-white/80 backdrop-blur-sm transition-colors duration-200 hover:border-white hover:bg-white/40 hover:text-white"
                >
                  <ArrowLeft size={20} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next project"
                  className="ease-soft flex size-11 items-center justify-center rounded-full border border-white/50 bg-white/20 text-white/80 backdrop-blur-sm transition-colors duration-200 hover:border-white hover:bg-white/40 hover:text-white"
                >
                  <ArrowRight size={20} aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
