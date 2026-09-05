'use client'

import { type ReactNode, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

type Direction = 'up' | 'down' | 'left' | 'right'

const HIDDEN_OFFSET: Record<Direction, string> = {
  up: 'translate-y-6',
  down: '-translate-y-6',
  left: '-translate-x-12',
  right: 'translate-x-12',
}

/**
 * Fades and un-blurs content as it scrolls into view.
 *
 * Deliberately additive: the element renders visible and is only hidden once
 * JS has confirmed it starts below the fold. A previous version applied
 * `opacity: 0` up front, so a failed observer — or no JS at all — left whole
 * sections blank.
 */
export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  direction?: Direction
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<'static' | 'hidden' | 'shown'>('static')

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Already on screen at load: leave it visible, so nothing flashes.
    if (element.getBoundingClientRect().top < window.innerHeight * 0.9) return

    setState('hidden')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setState('shown')
        observer.disconnect()
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.15 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={state === 'hidden' ? undefined : { transitionDelay: `${delay}s` }}
      className={cn(
        'ease-soft transition-[opacity,filter,transform] duration-500',
        state === 'hidden' &&
          cn('opacity-0 blur-[10px]', HIDDEN_OFFSET[direction]),
        className,
      )}
    >
      {children}
    </div>
  )
}
