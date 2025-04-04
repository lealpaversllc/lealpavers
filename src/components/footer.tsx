'use client'

import { Mail, PhoneCall } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import useMediaQuery from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'

import { Separator } from './ui/separator'

export function Footer() {
  const windowSize = useMediaQuery()
  const windowWidth = windowSize?.[0]

  if (!windowWidth) {
    return null
  }

  return (
    <footer className="bg-red-leal flex w-full flex-col items-center">
      <div
        className={cn(
          'container flex justify-center gap-2 p-5 font-normal text-white [&_h4]:text-2xl',
          windowWidth < 640 && 'flex-col',
          windowWidth >= 640 && 'h-[230px]',
        )}
      >
        <div className="space-y-2 px-3 py-4">
          <h4>Follow us</h4>
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
        <Separator
          orientation={windowWidth < 640 ? 'horizontal' : 'vertical'}
        />
        <div className="space-y-2 px-3 py-4">
          <h4>Get in Touch</h4>
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
        <Separator
          orientation={windowWidth < 640 ? 'horizontal' : 'vertical'}
        />
        <div className="space-y-2 px-3 py-4">
          <h4>Quick Links</h4>
          <div className="flex flex-col gap-2">
            <Link href="#home">Home</Link>
            <Link href="#services">Services</Link>
            <Link href="#about">About</Link>
            <Link href="#contact">Contact</Link>
          </div>
        </div>
      </div>
      <div className="container flex flex-col items-center">
        <p className="text-sm text-white">
          Copyright © {new Date().getFullYear()}{' '}
          <strong className="text-yellow-leal font-normal">Leal Pavers</strong>.
          All rights reserved.
        </p>
        <Image
          src="/assets/logo.svg"
          className="w-[236px] -translate-x-[13px]"
          width={300}
          height={200}
          alt=""
        />
      </div>
    </footer>
  )
}
