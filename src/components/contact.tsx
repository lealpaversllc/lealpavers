'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { SendEmail } from '@/actions/send-email'
import useMediaQuery from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'
import { Skeleton } from './ui/skeleton'
import { Textarea } from './ui/textarea'

const formSchema = z.object({
  name: z.string().min(1, { message: 'Fill in the field' }),
  email: z.string().email({ message: 'Email invalid.' }),
  address: z.string().optional(),
  phone: z.string().min(1, { message: 'Fill in the field' }),
  description: z.string().optional(),
})

export type FormSchema = z.infer<typeof formSchema>

export function Contact() {
  const windowSize = useMediaQuery()
  const windowWidth = windowSize?.[0]

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  if (!windowWidth) return <Skeleton className="h-[600px] w-full" />

  async function handleSubmitForm(data: FormSchema) {
    const result = await SendEmail(data)

    if (result.error) {
      toast('Try again later.', { duration: 2000 })
    }

    if (result.data) {
      form.reset()
      toast('Message sent successfully.', { duration: 2000 })
    }
  }

  return (
    <section
      id="contact"
      className="flex h-fit w-full flex-col items-center bg-black bg-[url(/assets/hero/contact-bg.png)] bg-cover bg-no-repeat pb-10"
    >
      <div className="container flex h-full justify-center gap-10 sm:py-24">
        <Image
          src="/assets/hero/contact.png"
          alt=""
          className="hidden w-1/2 rounded-xl lg:flex lg:max-w-fit"
          width={598}
          height={811}
        />
        <ScrollArea
          className={cn(
            'bg-red-leal flex w-full flex-col gap-3 p-14 sm:w-[598px] sm:rounded-xl',
            windowWidth > 1024 && 'max-h-[811px]',
          )}
        >
          <h3 className="bg-yellow-leal mb-4 w-fit rounded-xl p-7 py-2 text-3xl font-bold">
            Contact
          </h3>
          <p className="text-4xl font-semibold text-white">
            What should I do to get a free quote?
          </p>
          <p className="text-base font-normal text-white">
            It&apos;s very simple! Fill out the form below and one of our
            experts will contact you!
          </p>

          <form
            onSubmit={form.handleSubmit(handleSubmitForm)}
            className="mt-2 flex h-full flex-col justify-between gap-3"
          >
            <div className="space-y-2">
              <div className="flex flex-col gap-2">
                <Input
                  placeholder="Name*"
                  {...form.register('name')}
                  className="bg-white"
                />
                {form.formState.errors.name && (
                  <span className="text-yellow-leal text-sm">
                    {form.formState.errors.name.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  type="email"
                  {...form.register('email')}
                  placeholder="Email*"
                  className="bg-white"
                />
                {form.formState.errors.email && (
                  <span className="text-yellow-leal text-sm">
                    {form.formState.errors.email.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  placeholder="Phone number"
                  className="bg-white"
                  {...form.register('phone')}
                />
                {form.formState.errors.phone && (
                  <span className="text-yellow-leal text-sm">
                    {form.formState.errors.phone.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  {...form.register('address')}
                  placeholder="Address"
                  className="bg-white"
                />
                {form.formState.errors.address && (
                  <span className="text-yellow-leal text-sm">
                    {form.formState.errors.address.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Textarea
                  {...form.register('description')}
                  placeholder="Tell us about your project"
                  className="bg-white"
                />
                {form.formState.errors.description && (
                  <span className="text-yellow-leal text-sm">
                    {form.formState.errors.description.message}
                  </span>
                )}
              </div>
            </div>
            <Button
              type="submit"
              className="bg-yellow-leal hover:bg-yellow-leal/60 mt-4 w-full py-5 text-3xl font-extrabold text-black"
            >
              Send
            </Button>
          </form>
        </ScrollArea>
      </div>
    </section>
  )
}
