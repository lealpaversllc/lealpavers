import { Quote } from 'lucide-react'

import { testimonials } from '@/data/testimonials'

function Stars({ rating }: { rating: number }) {
  return (
    <span
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          className={
            index < rating ? 'fill-accent-600 size-4' : 'size-4 fill-stone-300'
          }
          aria-hidden
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </span>
  )
}

export function Testimonials() {
  return (
    <section
      className="py-section w-full bg-stone-50"
      aria-labelledby="testimonials-title"
    >
      <div className="container grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
          <h2
            id="testimonials-title"
            className="text-display text-brand-800 font-extrabold uppercase"
          >
            Your opinion
            <br />
            is worth a lot
          </h2>
          <div className="mt-5 flex items-center gap-3">
            <Stars rating={5} />
            <p className="text-sm font-medium text-stone-600">
              {testimonials.length} reviews on Google
            </p>
          </div>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2">
          {testimonials.map((review) => (
            <li
              key={review.name}
              className="rounded-card shadow-card ease-soft hover:shadow-card-hover flex flex-col gap-3 border border-stone-200 bg-white p-6 transition-shadow duration-300"
            >
              <Quote
                className="fill-accent-500 text-accent-500 size-5"
                aria-hidden
              />
              <blockquote className="text-stone-800">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <footer className="mt-auto flex items-center justify-between gap-3 pt-2">
                <cite className="text-base font-semibold text-stone-900 not-italic">
                  {review.name}
                </cite>
                <Stars rating={review.rating} />
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
