import { ServiceCard } from '@/components/service-card'
import { SectionHeading } from '@/components/ui/section-heading'
import { allServices, materials, services } from '@/data/services'

export function Service() {
  return (
    <section id="services" className="py-section bg-cream-200 w-full">
      <div className="container space-y-10">
        <SectionHeading
          eyebrow="What we do"
          title="Our Services"
          lead="From a single repair to a full driveway rebuild — installed by a crew that has been doing this for over ten years."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        <div className="rounded-card border-cream-300 border bg-white px-6 py-10 sm:px-10">
          <h3 className="text-accent-ink text-eyebrow text-center uppercase">
            Specializing in
          </h3>
          <ul className="text-brand-800 mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-lg font-semibold">
            {materials.map((material) => (
              <li key={material}>{material}</li>
            ))}
          </ul>
        </div>

        <div className="bg-brand-600 rounded-card px-6 py-10 sm:px-10">
          <h3 className="text-accent-300 text-eyebrow text-center uppercase">
            All our services
          </h3>
          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {allServices.map((service) => (
              <li
                key={service}
                className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium text-white"
              >
                {service}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
