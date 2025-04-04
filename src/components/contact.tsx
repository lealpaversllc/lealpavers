'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { Resend } from 'resend'
import { toast } from 'sonner'
import { z } from 'zod'

import useMediaQuery from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'

import { EmailTemplate } from './email-template'
import { Button } from './ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'
import { Textarea } from './ui/textarea'

const formSchema = z.object({
  name: z.string({ required_error: 'Fill in the field' }),
  email: z
    .string({ required_error: 'Fill in the field' })
    .email({ message: 'Email invalid.' }),
  address: z.string().optional(),
  phone: z.string({ required_error: 'Fill in the field' }),
  description: z.string().optional(),
})

export type FormSchema = z.infer<typeof formSchema>

export function Contact() {
  const windowSize = useMediaQuery()
  const windowWidth = windowSize?.[0]

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  const resend = new Resend('re_TUrut194_FsZxPP1yJcNZbB17Lm331S1y')

  async function handleSubmitForm(data: FormSchema) {
    const result = await resend.emails.send({
      from: 'info@lealpaversllc.com',
      to: 'yunoffyt@gmail.com',
      subject: 'New Contact',
      react: (
        <EmailTemplate
          email={data.email}
          name={data.name}
          phone={data.phone}
          address={data.address}
          description={data.description}
        />
      ),
    })

    if (result.error) {
      toast('Try again later.')
    }

    if (result.data) {
      toast('message sent successfully.')
    }
  }

  if (!windowWidth) {
    return null
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
        <Form {...form}>
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

            <Form {...form}>
              <form
                onClick={form.handleSubmit(handleSubmitForm)}
                className="flex h-full flex-col justify-between gap-3"
              >
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="gap-1">
                        <FormLabel />
                        <FormControl>
                          <Input
                            placeholder="Name*"
                            {...field}
                            className="bg-white"
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage className="text-yellow-leal" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="gap-1">
                        <FormLabel />
                        <FormControl>
                          <Input
                            type="email"
                            {...field}
                            placeholder="Email*"
                            className="bg-white"
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage className="text-yellow-leal" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="gap-1">
                        <FormLabel />
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Phone number"
                            className="bg-white"
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage className="text-yellow-leal" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="gap-1">
                        <FormLabel />
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Address"
                            className="bg-white"
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage className="text-yellow-leal" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="gap-1">
                        <FormLabel />
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Tell us about your project"
                            className="bg-white"
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage className="text-yellow-leal" />
                      </FormItem>
                    )}
                  />
                </div>
                <Button className="bg-yellow-leal hover:bg-yellow-leal/60 mt-4 w-full py-5 text-3xl font-extrabold text-black">
                  Send
                </Button>
              </form>
            </Form>
          </ScrollArea>
        </Form>
      </div>
    </section>
  )
}
