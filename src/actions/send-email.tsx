'use server'
import { Resend } from 'resend'

import type { FormSchema } from '@/components/contact'
import { EmailTemplate } from '@/components/email-template'
const resend = new Resend('re_TUrut194_FsZxPP1yJcNZbB17Lm331S1y')

export async function SendEmail(data: FormSchema) {
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
  return result
}
