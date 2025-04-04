/* eslint-disable @typescript-eslint/no-explicit-any */
import './style.css'

import { UnfoldHorizontal } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export function BeforeAfter({
  after,
  before,
}: {
  after: string
  before: string
}) {
  const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 })
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [beforeWidth, setBeforeWidth] = useState(50)

  const setSize = () => {
    const width = wrapperRef.current?.clientWidth || 0
    const height = wrapperRef.current?.clientHeight || 0
    setWrapperSize({ width, height })
  }

  useEffect(() => {
    setSize()
  }, [])

  useEffect(() => {
    window.addEventListener('resize', setSize)
    return () => {
      window.removeEventListener('resize', setSize)
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="relative h-[350px] w-full overflow-hidden rounded-2xl border-2 border-white"
    >
      {/* Before */}
      <div
        style={{ maxWidth: beforeWidth + '%' }}
        className="absolute inset-0 z-10 size-full overflow-hidden"
      >
        <Image
          className="max-w-none object-cover"
          src={before}
          width={wrapperSize.width}
          height={wrapperSize.height}
          style={{ height: wrapperSize.height + 'px' }}
          alt=""
        />
      </div>
      {/* After */}
      <div className="absolute inset-0 size-full">
        <Image
          className="max-w-none object-cover"
          src={after}
          width={wrapperSize.width}
          height={wrapperSize.height}
          style={{ height: wrapperSize.height + 'px' }}
          alt=""
        />
      </div>

      {/* Slider Button */}
      <div
        style={{ left: beforeWidth + '%' }}
        className="pointer-events-none absolute top-1/2 z-30 -translate-x-[14px] -translate-y-1/2 rounded-full bg-gray-50 p-1 text-gray-800 shadow-lg"
      >
        <UnfoldHorizontal size={20} />
      </div>

      {/* Slider */}
      <input
        type="range"
        min={0}
        max={100}
        value={beforeWidth}
        onChange={(e) => setBeforeWidth(+e.currentTarget.value)}
        className="absolute inset-0 z-20 appearance-none bg-transparent"
        style={{ ['--wrapper-height' as any]: wrapperSize.height + 'px' }}
      />
    </div>
  )
}
