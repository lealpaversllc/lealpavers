'use client'

import { AlignJustify, Mail, Phone, PhoneCall, User, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import useMediaQuery from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'

export function Header() {
  const [openMenu, setOpenMenu] = useState(false)

  const windowSize = useMediaQuery()
  const windowWidth = windowSize?.[0]

  if (!windowWidth) {
    return null
  }

  if (windowWidth < 768) {
    return (
      <div
        id="home"
        className={cn(
          'bg-red-leal fixed z-50 flex h-fit w-full flex-col items-center transition-transform',
          openMenu && 'h-screen w-full',
        )}
      >
        <div className="container flex w-full items-center justify-between max-md:px-5">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="rounded-md px-3 py-2 text-white transition-all hover:bg-white/10 hover:text-white"
          >
            {!openMenu && <AlignJustify strokeWidth={2.5} size={25} />}
            {openMenu && <X strokeWidth={2.5} size={25} />}
          </button>
          <Image
            alt=""
            src="assets/logo.svg"
            priority
            className="h-[52px] w-[105px]"
            height={52}
            width={105}
          />
        </div>
        {openMenu && (
          <div className="container mt-10 flex h-full flex-col justify-between max-md:px-5">
            <div className="flex flex-col gap-5 text-2xl font-semibold">
              <a
                href="#home"
                onClick={() => setOpenMenu(false)}
                className="px-2 text-white"
              >
                Home
              </a>
              <a
                onClick={() => setOpenMenu(false)}
                href="#services"
                className="px-2 text-white"
              >
                Services
              </a>
              <a
                onClick={() => setOpenMenu(false)}
                href="#about"
                className="px-2 text-white"
              >
                About
              </a>
              <a
                onClick={() => setOpenMenu(false)}
                href="#contact"
                className="px-2 text-white"
              >
                Contact
              </a>
            </div>
            <div className="pb-10">
              <div className="space-y-2 px-3 py-4">
                <h4 className="font-semibold text-white">Follow us</h4>
                <div className="inline-flex space-x-5">
                  <Link
                    href="https://www.facebook.com/share/1URRk2ER1E/?mibextid=wwXIfr"
                    target="_blank"
                  >
                    <Image
                      src="/assets/icons/facebook.svg"
                      alt=""
                      width={25}
                      height={25}
                      className="size-[25px]"
                    />
                  </Link>
                  <Link
                    href="https://www.instagram.com/lealpaversllc?igsh=dGMzdnRtdzQweGQw"
                    target="_blank"
                  >
                    <Image
                      src="/assets/icons/instagram.png"
                      alt=""
                      width={25}
                      height={25}
                      className="size-[25px]"
                    />
                  </Link>
                </div>
              </div>
              <div className="space-y-2 px-3 py-4 text-white">
                <h4 className="font-semibold">Get in Touch</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5">
                    <Mail size={20} />
                    <Link href="mailto:info@lealpaversllc.com">
                      info@lealpaversllc.com
                    </Link>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <PhoneCall size={20} />
                    <Link href="tel:+12397109419">(239) 710-9419</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div id="home" className="bg-red-leal flex w-full flex-col items-center">
      <div className="container flex items-center justify-between">
        <Image
          alt=""
          src="assets/logo.svg"
          priority
          className="h-[52px] w-[105px]"
          height={52}
          width={105}
        />
        <div className="flex items-center gap-4 font-normal lg:gap-8">
          <a href="#home" className="px-2 text-white">
            Home
          </a>
          <span className="bg-yellow-leal size-[5px] rounded-full" />
          <a href="#services" className="px-2 text-white">
            Services
          </a>
          <span className="bg-yellow-leal size-[5px] rounded-full" />
          <a href="#about" className="px-2 text-white">
            About
          </a>
          <span className="bg-yellow-leal size-[5px] rounded-full" />
          <a href="#contact" className="px-2 text-white">
            Contact
          </a>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="bg-yellow-leal text-red-leal flex h-fit cursor-pointer items-center gap-2 rounded-full border border-white px-4 py-1 font-normal lg:px-8 lg:py-1.5"
          >
            <Image
              alt=""
              src="assets/icons/shopping-cart.svg"
              width={16}
              height={16}
              className="size-[16px]"
            />
            Contact
          </a>
          <div className="">
            <span className="flex items-center gap-1.5 text-[14px] font-bold text-white">
              <User className="size-[16px]" strokeWidth={3} />
              Free quote
            </span>
            <Link
              href="tel:+12397109419"
              className="flex items-center gap-1.5 text-[14px] font-bold text-white"
            >
              <Phone className="size-[14px]" strokeWidth={3} />
              (239) 710-9419
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
