import './globals.css'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { Archivo, Inter } from 'next/font/google'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { StructuredData } from '@/components/structured-data'
import { Toaster } from '@/components/ui/sonner'
import { site } from '@/data/site'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Paver Installation in ${site.area.label}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'pavers',
    'paver installation',
    'paver driveway',
    'pool deck pavers',
    'retaining wall',
    'paver sealing',
    'paver repair',
    'hardscaping',
    'landscaping design',
    'Raleigh',
    'Raleigh NC',
    'the Triangle',
    'North Carolina',
  ],
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Paver Installation in ${site.area.label}`,
    description: site.description,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.name} & Landscaping Design`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Paver Installation in ${site.area.label}`,
    description: site.shortDescription,
    images: [site.ogImage],
  },
}

export const viewport: Viewport = {
  themeColor: '#1f394a',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable}`}>
      <body className="min-h-screen w-full antialiased">
        <a
          href="#services"
          className="bg-accent-500 text-brand-900 sr-only rounded-md px-4 py-2 font-semibold focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60]"
        >
          Skip to content
        </a>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
        <StructuredData />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
