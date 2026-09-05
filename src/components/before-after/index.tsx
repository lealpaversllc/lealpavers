'use client'

import './style.css'

import { UnfoldHorizontal } from 'lucide-react'
import Image from 'next/image'
import { useId, useState } from 'react'

export function BeforeAfter({
  after,
  before,
  label,
}: {
  after: string
  before: string
  label: string
}) {
  const [position, setPosition] = useState(50)
  const id = useId()

  return (
    <figure className="relative h-[22rem] w-full overflow-hidden rounded-2xl border-2 border-white">
      {/* After sits underneath and is revealed as the handle moves left. */}
      <Image
        src={after}
        alt={`${label} — after`}
        fill
        sizes="(min-width: 768px) 33vw, 92vw"
        className="object-cover"
      />

      {/* Clipping the full-size layer (rather than shrinking it) keeps both
          photos aligned, so no measuring of the wrapper is needed. */}
      <div
        className="absolute inset-0 z-10"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before}
          alt={`${label} — before`}
          fill
          sizes="(min-width: 768px) 33vw, 92vw"
          className="object-cover"
        />
      </div>

      <span
        aria-hidden
        className="absolute top-4 left-4 z-30 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase backdrop-blur-sm"
      >
        Before
      </span>
      <span
        aria-hidden
        className="absolute top-4 right-4 z-30 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase backdrop-blur-sm"
      >
        After
      </span>

      <div
        aria-hidden
        style={{ left: `${position}%` }}
        className="text-brand-800 pointer-events-none absolute top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-1 shadow-lg"
      >
        <UnfoldHorizontal size={20} />
      </div>

      <label htmlFor={id} className="sr-only">
        {label} — drag to compare before and after
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={1}
        value={position}
        onChange={(event) => setPosition(Number(event.currentTarget.value))}
        aria-valuetext={`${position}% before, ${100 - position}% after`}
        className="ba-range absolute inset-0 z-20 h-full w-full appearance-none bg-transparent"
      />
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  )
}
