'use client'

import { Toaster as Sonner, type ToasterProps } from 'sonner'

/**
 * The site has a single light theme, so the toaster is pinned to it rather
 * than reading a `next-themes` provider that was never mounted.
 */
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      position="top-center"
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
