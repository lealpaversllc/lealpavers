'use client'
import { Phone, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { BeforeAfter } from './before-after'
import ScrollElement from './ui/scroll-text'

const beforeAndAfterImages = [
  {
    before: '/assets/before-after/01-before.png',
    after: '/assets/before-after/01-after.png',
  },
  {
    before: '/assets/before-after/02-before.png',
    after: '/assets/before-after/02-after.png',
  },
  {
    before: '/assets/before-after/03-before.png',
    after: '/assets/before-after/03-after.png',
  },
]

export function About() {
  return (
    <section
      id="about"
      className="bg-red-leal flex w-full flex-col items-center space-y-5 overflow-x-hidden py-5"
    >
      <div className="container flex flex-col items-center gap-5 py-14 max-sm:px-5 md:max-w-[700px]">
        <ScrollElement
          direction="up"
          delay={0}
          variants={{
            hidden: { filter: 'blur(10px)', opacity: 0, y: 20 },
            visible: {
              filter: 'blur(0px)',
              opacity: 1,
              y: 0,
              transition: { ease: 'linear' },
            },
          }}
        >
          <p className="text-center text-3xl font-semibold text-white [&_strong]:font-semibold [&_strong]:text-[#FFD722]">
            We <strong>specialize</strong> in a wide range of services, from
            paving to renovations. Our goal is to <strong>deliver</strong> the
            best quality to our customers, combined with the{' '}
            <strong>commitment</strong> in completing our work.
          </p>
        </ScrollElement>
        <div className="flex w-full justify-around">
          <ScrollElement direction="left" delay={0.2}>
            <div>
              <p className="text-7xl font-semibold tracking-tighter text-white">
                + <strong className="text-[#FFD722]">7</strong>
              </p>
              <p className="text-center text-base leading-4 text-white">
                Years of <br />
                experience
              </p>
            </div>
          </ScrollElement>
          <ScrollElement direction="right" delay={0.2}>
            <div>
              <p className="text-7xl font-semibold tracking-tighter text-white">
                + <strong className="text-[#FFD722]">150</strong>
              </p>
              <p className="text-center text-base leading-4 text-white">
                Customers served,
                <br /> and satisfied
              </p>
            </div>
          </ScrollElement>
        </div>
        <ScrollElement
          direction="up"
          delay={0.3}
          variants={{
            hidden: { filter: 'blur(10px)', opacity: 0, y: 20 },
            visible: {
              filter: 'blur(0px)',
              opacity: 1,
              y: 0,
              transition: { ease: 'linear' },
            },
          }}
        >
          <div className="mt-10 text-center">
            <strong className="text-6xl font-semibold text-white">
              FORT MYERS, FL
            </strong>
            <p className="text-3xl text-[#FFD722]">
              We serve the entire region, contact us to confirm.
            </p>
          </div>
        </ScrollElement>

        <ScrollElement
          direction="up"
          delay={0.3}
          variants={{
            hidden: { filter: 'blur(10px)', opacity: 0, y: 20 },
            visible: {
              filter: 'blur(0px)',
              opacity: 1,
              y: 0,
              transition: { ease: 'linear' },
            },
          }}
        >
          <div className="mt-5 flex items-center gap-3">
            <a
              href="#contact"
              className="bg-yellow-leal text-red-leal flex h-fit cursor-pointer items-center gap-2 rounded-full border border-white px-8 py-1.5 text-2xl font-normal"
            >
              <Image
                alt=""
                src="assets/icons/shopping-cart.svg"
                width={25}
                height={25}
                className="size-[25px]"
              />
              Contact
            </a>
            <div className="text-xl">
              <span className="flex items-center gap-1.5 font-bold text-white">
                <User className="size-[16px]" strokeWidth={3} />
                Free quote
              </span>
              <Link
                href="tel:+12397109419"
                className="flex items-center gap-1.5 font-bold text-white"
              >
                <Phone className="size-[14px]" strokeWidth={3} />
                (239) 710-9419
              </Link>
            </div>
          </div>
        </ScrollElement>
      </div>
      <div className="container grid grid-cols-1 gap-2 max-md:px-4 md:grid-cols-3">
        {beforeAndAfterImages.map((item, i) => (
          <BeforeAfter {...item} key={i} />
        ))}
      </div>
    </section>
  )
}
