export type Service = {
  slug: string
  title: string
  description: string
  cover: string
  coverAlt: string
  gallery: { src: string; alt: string }[]
}

export const services: Service[] = [
  {
    slug: 'parking-lot',
    title: 'Parking Lot',
    description:
      'Durable paver parking areas built to carry daily traffic without rutting or settling.',
    cover: '/assets/services/root/parking-loot.webp',
    coverAlt: 'Paver parking lot laid in a herringbone pattern',
    gallery: [
      {
        src: '/assets/services/parking-loot/01.webp',
        alt: 'Finished paver parking area with marked bays',
      },
      {
        src: '/assets/services/parking-loot/02.webp',
        alt: 'Paver parking lot bordered by a concrete curb',
      },
      {
        src: '/assets/services/parking-loot/03.webp',
        alt: 'Wide view of a completed paver parking lot',
      },
    ],
  },
  {
    slug: 'driveway-and-walkway',
    title: 'Driveway and Walkway',
    description:
      'Driveways and front walkways that lift a home’s curb appeal and last for decades.',
    cover: '/assets/services/root/driveway-and-walkway.webp',
    coverAlt: 'Paver driveway leading up to a home',
    gallery: [
      {
        src: '/assets/services/driveway-and-walkway/01.webp',
        alt: 'Paver driveway in front of a tile-roofed house',
      },
      {
        src: '/assets/services/driveway-and-walkway/02.webp',
        alt: 'Walkway of interlocking pavers beside a lawn',
      },
      {
        src: '/assets/services/driveway-and-walkway/03.webp',
        alt: 'Completed driveway with a bordered paver edge',
      },
    ],
  },
  {
    slug: 'stairs',
    title: 'Stairs',
    description:
      'Paver steps and landings cut and set for even risers and safe footing.',
    cover: '/assets/services/root/stairs.webp',
    coverAlt: 'Paver staircase with a stone-capped landing',
    gallery: [
      {
        src: '/assets/services/stairs/01.webp',
        alt: 'Paver steps leading up to an entrance',
      },
      {
        src: '/assets/services/stairs/03.webp',
        alt: 'Close view of paver stair treads and risers',
      },
      {
        src: '/assets/services/stairs/02.webp',
        alt: 'Paver staircase joining two levels of a garden',
      },
    ],
  },
  {
    slug: 'pool-deck',
    title: 'Pool Deck',
    description:
      'Slip-resistant pool decks that stay cool underfoot and drain properly.',
    // Cover shares the newest gallery photo. Swapping a photo means a new
    // filename, never a new file at an old path: /_next/image caches by URL.
    cover: '/assets/services/pool-deck/04.webp',
    coverAlt: 'Paver pool deck with a raised stone spa beside the pool',
    // Newest work first.
    gallery: [
      {
        src: '/assets/services/pool-deck/04.webp',
        alt: 'Raised stone spa spilling into a pool, set in a large-format paver deck',
      },
      {
        src: '/assets/services/pool-deck/05.webp',
        alt: 'Pool deck in light porcelain pavers with geometric turf inlays',
      },
      {
        src: '/assets/services/pool-deck/06.webp',
        alt: 'Pool deck with a timber pergola, lounge seating and turf inlays',
      },
      {
        src: '/assets/services/pool-deck/01.webp',
        alt: 'Pool deck paved in large-format stone',
      },
      {
        src: '/assets/services/pool-deck/02.webp',
        alt: 'Paver pool surround with a screened enclosure',
      },
      {
        src: '/assets/services/pool-deck/03.webp',
        alt: 'Finished pool deck seen from the water',
      },
      {
        src: '/assets/services/pool-deck/07.webp',
        alt: 'Screened pool enclosure over a paver deck',
      },
    ],
  },
  {
    slug: 'repair',
    title: 'Repair',
    description:
      'Sunken, shifted or cracked pavers lifted, re-based and re-set to match.',
    cover: '/assets/services/root/repair.webp',
    coverAlt: 'Paver repair in progress on a driveway',
    gallery: [
      {
        src: '/assets/services/repair/01.webp',
        alt: 'Pavers lifted to expose the base during a repair',
      },
      {
        src: '/assets/services/repair/02.webp',
        alt: 'Re-levelled base being prepared before re-setting pavers',
      },
      {
        src: '/assets/services/repair/03.webp',
        alt: 'Repaired paver surface restored to an even finish',
      },
    ],
  },
  {
    slug: 'coping-and-tile',
    title: 'Coping and Tile',
    description:
      'Pool coping and tile work that finishes the edge cleanly and seals the waterline.',
    cover: '/assets/services/root/coping-and-tile.webp',
    coverAlt: 'Pool coping and waterline tile detail',
    gallery: [
      {
        src: '/assets/services/coping-and-tile/01.webp',
        alt: 'Newly installed pool coping along the pool edge',
      },
      {
        src: '/assets/services/coping-and-tile/02.webp',
        alt: 'Waterline tile set beneath stone coping',
      },
      {
        src: '/assets/services/coping-and-tile/03.webp',
        alt: 'Close view of finished coping and tile',
      },
    ],
  },
  {
    slug: 'retaining-wall',
    title: 'Retaining Wall',
    description:
      'Engineered retaining walls that hold back grade and shape usable outdoor space.',
    // Cover shares the first gallery photo. Swapping a photo means a new
    // filename, never a new file at an old path: /_next/image caches by URL.
    cover: '/assets/services/retaining-wall/01.webp',
    coverAlt:
      'Paver retaining wall stepping down to a patio, with a gravel bed along the top',
    gallery: [
      {
        src: '/assets/services/retaining-wall/01.webp',
        alt: 'Paver retaining wall stepping down to a patio, with a gravel bed along the top',
      },
      {
        src: '/assets/services/retaining-wall/02.webp',
        alt: 'Curved retaining wall with a capped top course',
      },
      {
        src: '/assets/services/retaining-wall/03.webp',
        alt: 'Retaining wall under construction with drainage in place',
      },
    ],
  },
  {
    slug: 'paver-sealing',
    title: 'Paver Sealing',
    description:
      'Cleaning, re-sanding and sealing that locks in colour and keeps weeds and stains out.',
    cover: '/assets/services/root/paver-sealing.webp',
    coverAlt: 'Sealed pavers with a deepened colour finish',
    gallery: [
      {
        src: '/assets/services/paver-sealing/01.webp',
        alt: 'Driveway part-way through sealing, showing the colour change',
      },
      {
        src: '/assets/services/paver-sealing/02.webp',
        alt: 'Sealer being applied across a paver surface',
      },
      {
        src: '/assets/services/paver-sealing/03.webp',
        alt: 'Pavers after cleaning, re-sanding and sealing',
      },
    ],
  },
]

/** Surfaces the crew installs, from the brand collateral. */
export const materials = [
  'Marble',
  'Travertine',
  'Porcelain',
  'Natural Stone',
  'Concrete Pavers',
  'Tile & Coping Installation',
]

/** Everything the crew takes on, including work without a dedicated card. */
export const allServices = [
  'Driveway',
  'Walkway',
  'Sidewalk',
  'Patio',
  'Parking Lot',
  'Pool Deck',
  'Stairs',
  'Retaining Wall',
  'Coping and Tile',
  'Repair',
  'Paver Cleaning',
  'Paver Sealing',
]
