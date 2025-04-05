import { ChevronsRight } from 'lucide-react'
import Image from 'next/image'

import { ScrollArea } from './scroll-area'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet'

export function Card({
  src,
  title,
  gallery,
}: {
  title: string
  src: string
  gallery: {
    src: string
  }[]
}) {
  return (
    <>
      <div className="group relative mx-auto mt-10 h-[400px] w-full overflow-hidden rounded-md border bg-white text-black dark:border-0 dark:bg-black dark:text-white">
        <figure className="h-full w-full overflow-hidden rounded-md">
          <Image
            src={src}
            alt="shoes"
            width={600}
            height={600}
            className="h-full w-full scale-105 rounded-lg object-cover transition-all duration-300 group-hover:scale-100"
          />
        </figure>
        <div className="to-yellow-leal/30 absolute top-0 left-0 h-full w-full from-zinc-900/10 via-zinc-900/10 transition-all duration-300 group-hover:bg-gradient-to-b" />
        <article className="absolute bottom-0 space-y-2 p-4 transition-all duration-300 group-hover:bottom-0 md:-bottom-10">
          <h1 className="text-2xl font-semibold text-white capitalize">
            {title}
          </h1>
          <Sheet>
            <SheetTrigger className="flex gap-1 text-base font-normal text-blue-600 opacity-100 transition-all duration-300 outline-none group-hover:translate-y-0 group-hover:opacity-100 md:translate-y-2 md:pt-2 md:opacity-0 dark:text-white">
              View more
              <span>
                <ChevronsRight />
              </span>
            </SheetTrigger>
            <SheetContent className="h-screen min-w-full md:min-w-1/2">
              <ScrollArea className="h-full">
                <SheetHeader>
                  <SheetTitle className="text-2xl">{title}</SheetTitle>
                </SheetHeader>
                <div className="space-y-4 p-4">
                  {gallery.map((item, i) => (
                    <figure
                      key={i}
                      className="h-full w-full overflow-hidden rounded-md"
                    >
                      <Image
                        src={item.src}
                        alt={item.src}
                        width={800}
                        height={600}
                        className="h-[600px] w-[800px] scale-100 rounded-lg object-cover transition-all duration-300 group-hover:scale-100"
                      />
                    </figure>
                  ))}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </article>
      </div>
    </>
  )
}
