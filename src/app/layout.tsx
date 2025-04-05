import './globals.css'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'

const poppinsSans = Poppins({
  variable: '--font-poppins-sans',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Leal Pavers',
  description:
    'Transform your space with professional services from Leal Pavers.',
  openGraph: {
    title: 'Leal Pavers',
    description:
      'Transform your space with professional services from Leal Pavers.',
    url: 'https://lealpaversllc.com',
    siteName: 'Leal Pavers',
    images: [
      {
        url: 'https://lealpaversllc.com/assets/logo.svg',
        width: 1200,
        height: 630,
        alt: 'Image of Leal Pavers services',
      },
    ],
    locale: 'en',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppinsSans.variable} min-h-screen w-full antialiased`}
      >
        <Header />
        {children}
        <Toaster />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
