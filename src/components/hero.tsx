'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'

import useMediaQuery from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'

import { Skeleton } from './ui/skeleton'

const images = [
  '/assets/hero/01.png',
  '/assets/hero/02.png',
  '/assets/hero/03.png',
]
const imagesMobile = [
  '/assets/hero/mobile/01.png',
  '/assets/hero/mobile/02.png',
  '/assets/hero/mobile/03.png',
]

export function Hero() {
  const itemsRef = useRef(images)
  const itemsMobileRef = useRef(imagesMobile)
  const [currentIndex, setCurrentIndex] = useState(0)

  const windowSize = useMediaQuery()
  const windowWidth = windowSize?.[0]

  if (!windowWidth) {
    return <Skeleton className="h-[600px] w-full" />
  }

  const handleKeyLeft = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    )
  }

  const handleKeyRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  return (
    <section className="bg-red-leal relative w-full bg-[url(/assets/hero/background-red.png)] bg-cover bg-no-repeat shadow-md">
      <div className="relative mx-auto h-[427px] w-full overflow-hidden sm:h-[627px]">
        <div className="absolute z-30 flex h-full w-full flex-col items-center max-md:px-4">
          <div className="relative container flex h-full items-center justify-between">
            {windowWidth < 768 && (
              <span className="absolute right-0 bottom-2 text-xl font-black text-white">
                &quot;YOUR SPACE <br /> OUR ART&quot;
              </span>
            )}
            <div className="absolute bottom-0 z-40 flex flex-col gap-10">
              <div className="space-y-2">
                {windowWidth >= 768 && (
                  <>
                    <span className="flex h-[162px] w-[236px] rounded-tl-2xl rounded-tr-2xl rounded-br-2xl bg-[url(/assets/hero/staircase-on-logo.png)] bg-cover xl:h-[260px] xl:w-[377px]" />
                    <span className="text-3xl font-black text-white">
                      &quot;YOUR SPACE <br /> OUR ART&quot;
                    </span>
                  </>
                )}
              </div>
              <Image
                src="/assets/logo.svg"
                className="w-[150px] -translate-x-[13px] xl:w-[236px]"
                width={300}
                height={200}
                alt=""
              />
            </div>
            <button
              onClick={handleKeyLeft}
              className="z-40 flex size-[48px] items-center justify-center rounded-full border border-white/50 bg-white/20 text-white/70 hover:cursor-pointer hover:border-white hover:bg-white/50 hover:text-white"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={handleKeyRight}
              className="z-40 flex size-[48px] items-center justify-center rounded-full border border-white/50 bg-white/20 text-white/70 hover:cursor-pointer hover:border-white hover:bg-white/50 hover:text-white"
            >
              <ArrowRight size={20} />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2">
              {itemsRef.current.map((item, i) => (
                <span
                  key={i}
                  className={cn(
                    'size-4 rounded-[3px] border border-white bg-zinc-400',
                    i === currentIndex && 'bg-red-leal',
                  )}
                />
              ))}
              <span />
            </div>
          </div>
        </div>
        <div className="absolute left-1/2 flex h-[427px] w-[800px] -translate-x-1/2 sm:h-[627px]">
          {windowWidth < 768
            ? itemsMobileRef.current.map((src, i) => (
                <motion.div
                  key={i}
                  className={cn(
                    'absolute h-[627px] w-[800px]',
                    i === currentIndex
                      ? 'z-30'
                      : i === (currentIndex + 1) % images.length
                        ? 'z-20'
                        : 'z-10',
                  )}
                  initial={{
                    x:
                      i === currentIndex
                        ? '0%'
                        : i === (currentIndex + 1) % images.length
                          ? '40%'
                          : '80%',
                  }}
                  animate={{
                    x:
                      i === currentIndex
                        ? '0%'
                        : i === (currentIndex + 1) % images.length
                          ? '40%'
                          : '80%',
                  }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeIn',
                  }}
                >
                  <Image
                    alt=""
                    src={src}
                    width={800}
                    height={627}
                    priority={i === 0}
                  />
                </motion.div>
              ))
            : itemsRef.current.map((src, i) => (
                <motion.div
                  key={i}
                  className={cn(
                    'absolute h-[627px] w-[800px]',
                    i === currentIndex
                      ? 'z-30'
                      : i === (currentIndex + 1) % images.length
                        ? 'z-20'
                        : 'z-10',
                  )}
                  initial={{
                    x:
                      i === currentIndex
                        ? '0%'
                        : i === (currentIndex + 1) % images.length
                          ? '40%'
                          : '80%',
                  }}
                  animate={{
                    x:
                      i === currentIndex
                        ? '0%'
                        : i === (currentIndex + 1) % images.length
                          ? '40%'
                          : '80%',
                  }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeIn',
                  }}
                >
                  <Image alt="" src={src} width={800} height={627} />
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  )
}
