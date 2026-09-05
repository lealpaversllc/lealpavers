export const site = {
  name: 'Leal Pavers',
  legalName: 'Leal Pavers LLC',
  url: 'https://lealpaversllc.com',
  tagline: 'Your space, our art',
  shortDescription:
    'Paver installation, repair and sealing in Fort Myers, Florida.',
  description:
    'Leal Pavers is a Fort Myers paving and landscaping company specializing in driveways, walkways, pool decks, retaining walls, stairs, paver repair and sealing. Over 7 years of experience and 150+ customers served across Southwest Florida. Free quotes.',
  founded: 2018,

  phone: {
    display: '(239) 710-9419',
    href: 'tel:+12397109419',
    e164: '+12397109419',
  },
  email: 'info@lealpaversllc.com',

  area: {
    city: 'Fort Myers',
    region: 'FL',
    regionName: 'Florida',
    country: 'US',
    label: 'Fort Myers, FL',
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
