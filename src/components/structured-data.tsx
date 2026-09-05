import { services } from '@/data/services'
import { site } from '@/data/site'
import { testimonials } from '@/data/testimonials'

/**
 * LocalBusiness markup. This is what lets Google surface the phone number,
 * service area, rating and service list for a local search.
 *
 * There is no street address on file, so the business is described by the
 * area it serves rather than a `PostalAddress`.
 */
export function StructuredData() {
  const average =
    testimonials.reduce((total, review) => total + review.rating, 0) /
    testimonials.length

  const data = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${site.url}/#business`,
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    description: site.description,
    slogan: site.tagline,
    image: `${site.url}/og.png`,
    logo: `${site.url}/icon-512.png`,
    telephone: site.phone.e164,
    email: site.email,
    foundingDate: String(site.founded),
    founder: { '@type': 'Person', name: site.contactName },
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.area.city,
      addressRegion: site.area.region,
      addressCountry: site.area.country,
    },
    areaServed: {
      '@type': 'City',
      name: site.area.city,
      containedInPlace: {
        '@type': 'State',
        name: site.area.regionName,
      },
    },
    sameAs: site.socials.map((social) => social.href),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: average.toFixed(1),
      reviewCount: testimonials.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: testimonials.map((review) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: review.name },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
      },
      reviewBody: review.quote,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Paving and landscaping services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
          areaServed: site.area.label,
        },
      })),
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
