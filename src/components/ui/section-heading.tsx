import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  tone = 'light',
  className,
  id,
}: {
  eyebrow?: string
  title: string
  lead?: string
  align?: 'left' | 'center'
  /** `light` = dark text on a light surface, `dark` = light text on brand red. */
  tone?: 'light' | 'dark'
  className?: string
  id?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            'text-eyebrow uppercase',
            tone === 'dark' ? 'text-accent-300' : 'text-brand-600',
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={cn(
          'text-h2 font-bold',
          tone === 'dark' ? 'text-white' : 'text-brand-800',
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            'text-lead max-w-2xl',
            tone === 'dark' ? 'text-white/85' : 'text-muted-foreground',
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  )
}
