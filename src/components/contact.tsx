'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { SendEmail } from '@/actions/send-email'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { type ContactSchema, contactSchema } from '@/lib/schemas/contact'

const labelClass = 'text-white'
const messageClass = 'text-accent-300'
const fieldClass = 'bg-white text-stone-900 h-11'

export function Contact() {
  const form = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      description: '',
      company: '',
    },
  })

  const { isSubmitting } = form.formState

  async function handleSubmitForm(data: ContactSchema) {
    const result = await SendEmail(data)

    if (!result.ok) {
      toast.error(result.error, { duration: 4000 })
      return
    }

    form.reset()
    toast.success('Message sent. We will get back to you shortly.', {
      duration: 4000,
    })
  }

  return (
    <section
      id="contact"
      className="py-section w-full bg-stone-900 bg-[url(/assets/hero/contact-bg.webp)] bg-cover bg-center bg-no-repeat"
      aria-labelledby="contact-title"
    >
      <div className="container flex justify-center gap-10">
        <Image
          src="/assets/hero/contact.webp"
          alt="Paver driveway completed by the Leal Pavers crew"
          width={598}
          height={811}
          sizes="37.375rem"
          className="hidden w-[37.375rem] shrink-0 self-stretch rounded-xl object-cover lg:block"
        />

        <div className="bg-brand-600 w-full max-w-[37.375rem] rounded-xl p-6 sm:p-10">
          <p className="bg-accent-500 text-brand-900 text-eyebrow w-fit rounded-full px-4 py-1.5 uppercase">
            Contact
          </p>
          <h2
            id="contact-title"
            className="text-h2 mt-4 font-bold text-balance text-white"
          >
            What should I do to get a free quote?
          </h2>
          <p className="mt-2 text-base text-white/85">
            It&apos;s very simple! Fill out the form below and one of our
            experts will contact you.
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmitForm)}
              noValidate
              className="mt-8 space-y-4"
            >
              {/* Honeypot: off-screen rather than hidden so bots still fill it. */}
              <div
                aria-hidden
                className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden"
              >
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...form.register('company')}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>Name *</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="name"
                        className={fieldClass}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className={messageClass} />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>Email *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        className={fieldClass}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className={messageClass} />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>Phone number *</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        className={fieldClass}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className={messageClass} />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>Address</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="street-address"
                        className={fieldClass}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className={messageClass} />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>
                      Tell us about your project
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        className="min-h-28 bg-white text-stone-900"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className={messageClass} />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                variant="accent"
                size="xl"
                disabled={isSubmitting}
                className="mt-2 w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" aria-hidden />
                    Sending…
                  </>
                ) : (
                  'Send'
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  )
}
