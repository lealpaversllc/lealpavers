import { BeforeAfter } from '@/components/before-after'
import { CtaContact } from '@/components/cta-contact'
import { Reveal } from '@/components/ui/reveal'
import { beforeAfterProjects } from '@/data/projects'
import { site } from '@/data/site'
import { stats } from '@/data/stats'

export function About() {
  return (
    <section
      id="about"
      className="bg-brand-600 py-section w-full overflow-x-hidden"
      aria-labelledby="about-title"
    >
      <div className="container flex flex-col items-center gap-12">
        <div className="flex w-full max-w-[44rem] flex-col items-center gap-10">
          <Reveal>
            <p className="text-h3 [&_strong]:text-accent-500 text-center font-semibold text-white [&_strong]:font-semibold">
              We <strong>specialize</strong> in a wide range of services, from
              paving to renovations. Our goal is to <strong>deliver</strong> the
              best quality to our customers, combined with the{' '}
              <strong>commitment</strong> in completing our work.
            </p>
          </Reveal>

          <dl className="flex w-full justify-around gap-8">
            {stats.map((stat, index) => (
              <Reveal
                key={stat.value}
                direction={index === 0 ? 'left' : 'right'}
                delay={0.15}
              >
                <div className="text-center">
                  <dd className="text-display text-accent-500 font-extrabold tracking-tight">
                    {stat.value}
                  </dd>
                  <dt className="mt-1 text-base leading-tight whitespace-pre-line text-white">
                    {stat.label}
                  </dt>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.2}>
            <div className="mt-4 text-center">
              <h2
                id="about-title"
                className="text-h1 font-extrabold text-white uppercase"
              >
                {site.area.city}, {site.area.region}
              </h2>
              <p className="text-lead text-accent-300 mt-2">{site.area.note}</p>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <CtaContact size="lg" />
          </Reveal>
        </div>
      </div>

      <div className="container mt-14">
        <h3 className="text-eyebrow text-accent-300 mb-4 text-center uppercase">
          Before &amp; after
        </h3>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {beforeAfterProjects.map((project) => (
            <li key={project.after}>
              <BeforeAfter {...project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
