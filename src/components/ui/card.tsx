import { ChevronsRight } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'

import { ScrollArea } from './scroll-area'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './sheet'

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
  const [sheet, setSheet] = useState(false)
  const refGroup = useRef<HTMLDivElement>(null)

  return (
    <>
      <div
        ref={refGroup}
        className="group relative mx-auto mt-10 h-[400px] w-full overflow-hidden rounded-md border bg-white text-black dark:border-0 dark:bg-black dark:text-white"
      >
        <figure className="h-full w-full overflow-hidden rounded-md">
          <Image
            src={src}
            alt="shoes"
            width={1200}
            height={1200}
            className="h-[600px] w-[600px] scale-105 rounded-lg object-cover transition-all duration-300 group-hover:scale-100"
          />
        </figure>
        <div className="to-yellow-leal/30 absolute top-0 left-0 h-full w-full from-zinc-900/10 via-zinc-900/10 transition-all duration-300 group-hover:bg-gradient-to-b" />
        <article className="absolute bottom-0 space-y-2 p-4 transition-all duration-300">
          <h1 className="text-2xl font-semibold text-white capitalize">
            {title}
          </h1>
          <button
            onClick={() => setSheet(true)}
            className="flex gap-1 text-base font-normal text-white opacity-100 transition-all duration-300 outline-none md:pt-2 dark:text-white"
          >
            View more
            <span>
              <ChevronsRight />
            </span>
          </button>
        </article>
      </div>
      <Sheet open={sheet} onOpenChange={setSheet}>
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
    </>
  )
}
