import { site } from '@/data/site'

/**
 * The tailgate line from the vehicle wrap, where "QUALITY." and "DESIGNED"
 * are set in gold against the navy.
 */
export function PromiseBand() {
  return (
    <section className="bg-brand-900 w-full py-14" aria-label="Our promise">
      <div className="container flex flex-col items-center gap-5 text-center">
        <span aria-hidden className="bg-accent-500 h-1 w-16 rounded-full" />
        <p className="text-h2 text-cream-100 font-bold tracking-wide uppercase">
          Built on <span className="text-accent-400">quality.</span>{' '}
          <span className="text-accent-400">Designed</span> to last.
        </p>
        <p className="text-taupe-300 text-sm">
          {site.pillars.join(' · ')} — {site.area.label}
        </p>
      </div>
    </section>
  )
}
