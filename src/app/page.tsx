import { About } from '@/components/about'
import { Contact } from '@/components/contact'
import { Hero } from '@/components/hero'
import { Service } from '@/components/services'
import { Testimonials } from '@/components/testimonials'

export default function Home() {
  return (
    <>
      <Hero />
      <Service />
      <About />
      <Testimonials />
      <Contact />
    </>
  )
}
