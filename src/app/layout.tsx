import './globals.css'

import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'

const poppinsSans = Poppins({
  variable: '--font-poppins-sans',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Leal Pavers',
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
      </body>
    </html>
  )
}
