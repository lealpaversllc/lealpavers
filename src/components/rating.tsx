'use client'
import Image from 'next/image'

import useMediaQuery from '@/hooks/use-media-query'

import { Skeleton } from './ui/skeleton'

export function Rating() {
  const windowSize = useMediaQuery()
  const windowWidth = windowSize?.[0]

  if (!windowWidth) {
    return <Skeleton className="h-[600px] w-full" />
  }

  return (
    <Image
      src={
        windowWidth < 768
          ? '/assets/hero/rating-mobile.png'
          : '/assets/hero/rating.png'
      }
      alt=""
      width={1920}
      height={574}
      className="w-full object-cover"
    />
  )
}
