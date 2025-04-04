'use client'
import useMediaQuery from '@/hooks/use-media-query'

import { Card } from './ui/card'

export function Service() {
  const windowSize = useMediaQuery()
  const windowWidth = windowSize?.[0]

  if (!windowWidth) {
    return null
  }

  const services = [
    {
      title: 'Parking Lot',
      src: '/assets/services/root/parking-loot.jpeg',
      gallery: [
        { src: '/assets/services/parking-loot/01.jpeg' },
        { src: '/assets/services/parking-loot/02.jpeg' },
        { src: '/assets/services/parking-loot/03.jpeg' },
      ],
    },
    {
      title: 'Driveway and Walkway',
      src: '/assets/services/root/driveway-and-walkway.jpeg',
      gallery: [
        { src: '/assets/services/driveway-and-walkway/01.jpeg' },
        { src: '/assets/services/driveway-and-walkway/02.jpeg' },
        { src: '/assets/services/driveway-and-walkway/03.jpeg' },
      ],
    },
    {
      title: 'Stairs',
      src: '/assets/services/root/stairs.jpeg',
      gallery: [
        { src: '/assets/services/stairs/01.jpeg' },
        { src: '/assets/services/stairs/03.jpeg' },
        { src: '/assets/services/stairs/02.jpeg' },
      ],
    },
    {
      title: 'Pool Deck',
      src: '/assets/services/root/pool-deck.jpeg',
      gallery: [
        { src: '/assets/services/pool-deck/01.jpeg' },
        { src: '/assets/services/pool-deck/02.jpeg' },
        { src: '/assets/services/pool-deck/03.jpeg' },
      ],
    },
    {
      title: 'Repair',
      src: '/assets/services/root/repair.jpeg',
      gallery: [
        { src: '/assets/services/repair/01.jpeg' },
        { src: '/assets/services/repair/02.jpeg' },
        { src: '/assets/services/repair/03.jpeg' },
      ],
    },
    {
      title: 'Coping and Tile',
      src: '/assets/services/root/coping-and-tile.jpeg',
      gallery: [
        { src: '/assets/services/coping-and-tile/01.jpeg' },
        { src: '/assets/services/coping-and-tile/02.jpeg' },
        { src: '/assets/services/coping-and-tile/03.jpeg' },
      ],
    },
  ]

  return (
    <section
      id="services"
      className="flex w-full flex-col items-center bg-[#D7D7D6] pb-10"
    >
      <div className="container py-10 max-md:px-4">
        <h2 className="text-red-leal text-3xl font-bold">Our Services</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <Card
              key={item.src}
              src={item.src}
              title={item.title}
              gallery={item.gallery}
            />
          ))}
        </div>
      </div>
      <div className="container max-md:px-4">
        <div className="bg-red-leal flex flex-col items-center p-10">
          <h3 className="text-yellow-leal text-2xl font-semibold">
            All our services:
          </h3>
          <p className="text-center text-white">
            Driveway - Pool Deck - Sidewalk - Retaining Wall - Patio - Repair -
            Stairs
          </p>
        </div>
      </div>
    </section>
  )
}
