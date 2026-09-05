import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * The type scale in globals.css adds font sizes tailwind-merge does not know
 * about. Without this it reads `text-h2` as a text *colour* and drops it when
 * a real colour class follows in the same `cn()` call.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['display', 'h1', 'h2', 'h3', 'lead', 'eyebrow'] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
