export const site = {
  name: 'Leal Pavers',
  legalName: 'Leal Pavers LLC',
  url: 'https://www.lealpaversdesign.com',
  /**
   * Link previews are cached by URL, so bump the version whenever
   * `public/og.png` changes or WhatsApp, Google and iMessage keep showing
   * the old artwork.
   */
  ogImage: '/og.png?v=2',
  tagline: 'Transforming outdoor spaces',
  legacyTagline: 'Your space, our art',
  promise: 'Built on quality. Designed to last.',
  contactName: 'Diego Leal',

  /** The three pillars carried on the vehicle wrap. */
  pillars: ['Pavers', 'Outdoor Design', 'Landscaping'],
  shortDescription:
    'Paver installation, repair and sealing in Raleigh, North Carolina.',
  description:
    'Leal Pavers is a Raleigh paving and landscaping company specializing in driveways, walkways, pool decks, retaining walls, stairs, paver repair and sealing. Over 10 years of experience and 150+ customers served across the Triangle and central North Carolina. Free quotes.',
  founded: 2016,

  phone: {
    display: '(252) 363-3298',
    href: 'tel:+12523633298',
    e164: '+12523633298',
  },
  email: 'info@lealpaversdesign.com',

  area: {
    city: 'Raleigh',
    region: 'NC',
    regionName: 'North Carolina',
    country: 'US',
    label: 'Raleigh, NC',
    note: 'Serving the Triangle area in North Carolina.',
    /**
     * Towns the crew covers. Drives `areaServed` in the LocalBusiness markup,
     * which is what a "pavers near me" search reads.
     */
    serves: [
      'Raleigh',
      'Durham',
      'Chapel Hill',
      'Cary',
      'Apex',
      'Morrisville',
      'Wake Forest',
      'Holly Springs',
      'Fuquay-Varina',
      'Garner',
      'Knightdale',
      'Clayton',
    ],
  },

  // Canonical profile URLs: the shared links carried `mibextid`/`stkn`/`utm_source`
  // tracking params, which are poor `sameAs` values for structured data.
  socials: [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/share/1J8SNTPxgw/',
      icon: '/assets/icons/facebook.svg',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/lealpaverslandscapllc',
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
