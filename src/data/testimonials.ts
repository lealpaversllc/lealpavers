export type Testimonial = {
  name: string
  rating: number
  quote: string
  source: string
}

/**
 * Previously baked into `assets/hero/rating.png`, which made the reviews
 * invisible to search engines and screen readers.
 */
export const testimonials: Testimonial[] = [
  {
    name: 'Ann White',
    rating: 5,
    quote: 'I recommend it, they delivered the service in perfect condition.',
    source: 'Google',
  },
  {
    name: 'Dave Chandler',
    rating: 5,
    quote: 'They did the work in my garage yard, they were very quick.',
    source: 'Google',
  },
  {
    name: 'Schlier Mazza',
    rating: 5,
    quote: "The best I've ever seen.",
    source: 'Google',
  },
  {
    name: 'Steve Boyd',
    rating: 5,
    quote:
      "I'm not much of a praiser on the internet, but they deserve congratulations.",
    source: 'Google',
  },
]
