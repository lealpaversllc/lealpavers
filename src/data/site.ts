export const site = {
  name: 'Leal Pavers',
  legalName: 'Leal Pavers LLC',
  url: 'https://lealpaversllc.com',
  tagline: 'Transforming outdoor spaces',
  legacyTagline: 'Your space, our art',
  promise: 'Built on quality. Designed to last.',
  contactName: 'Diego Leal',

  /** The three pillars carried on the vehicle wrap. */
  pillars: ['Pavers', 'Outdoor Design', 'Landscaping'],
  shortDescription:
    'Paver installation, repair and sealing in Raleigh, North Carolina.',
  description:
    'Leal Pavers is a Raleigh paving and landscaping company specializing in driveways, walkways, pool decks, retaining walls, stairs, paver repair and sealing. Over 7 years of experience and 150+ customers served across the Triangle and central North Carolina. Free quotes.',
  founded: 2018,

  phone: {
    display: '(252) 363-3298',
    href: 'tel:+12523633298',
    e164: '+12523633298',
  },
  email: 'info@lealpaversllc.com',

  area: {
    city: 'Raleigh',
    region: 'NC',
    regionName: 'North Carolina',
    country: 'US',
    label: 'Raleigh, NC',
    note: 'We serve the entire region, contact us to confirm.',
  },

  // Canonical profile URLs: the share links carried `mibextid`/`igsh`
  // tracking params, which are poor `sameAs` values for structured data.
  socials: [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/share/1URRk2ER1E/',
      icon: '/assets/icons/facebook.svg',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/lealpaversllc',
      icon: '/assets/icons/instagram.webp',
    },
  ],

  nav: [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
} as const
