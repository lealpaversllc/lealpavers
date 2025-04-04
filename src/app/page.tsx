import { About } from '@/components/about'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { Rating } from '@/components/rating'
import { Service } from '@/components/services'

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center">
      <Hero />
      <Service />
      <About />
      <Rating />
      <Contact />
      <Footer />
    </div>
  )
}
