'use client'

import { ChevronsRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import type { Service } from '@/data/services'

export function ServiceCard({ service }: { service: Service }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <article className="group rounded-card shadow-card hover:shadow-card-hover ease-soft relative h-100 overflow-hidden transition-shadow duration-300">
        <Image
          src={service.cover}
          alt={service.coverAlt}
          fill
          // The cover is a square crop in a 400px-tall box, so the browser
          // needs a wider file than the card's own width at every breakpoint.
          sizes="(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw"
          className="ease-soft object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          aria-hidden
          className="from-brand-900/90 via-brand-900/35 absolute inset-0 bg-gradient-to-t to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 space-y-1.5 p-5">
          <h3 className="text-h3 font-bold text-white">{service.title}</h3>
          <p className="line-clamp-3 text-sm text-white/80">
            {service.description}
          </p>
          {/* `after` stretches the hit area over the whole card while the
              accessible name stays on the button. */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="ease-soft text-accent-300 mt-1 inline-flex items-center gap-1 text-sm font-semibold transition-colors duration-200 after:absolute after:inset-0 after:content-[''] hover:text-white"
          >
            View more
            <span className="sr-only"> {service.title} photos</span>
            <ChevronsRight className="size-4" aria-hidden />
          </button>
        </div>
      </article>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full sm:max-w-xl">
          <ScrollArea className="h-full">
            <SheetHeader>
              <SheetTitle className="text-h3 font-bold">
                {service.title}
              </SheetTitle>
              <SheetDescription>{service.description}</SheetDescription>
            </SheetHeader>
            <div className="space-y-4 p-4">
              {service.gallery.map((photo) => (
                <figure
                  key={photo.src}
                  className="rounded-card relative aspect-4/3 w-full overflow-hidden"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 640px) 768px, 100vw"
                    className="object-cover"
                  />
                </figure>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  )
}
