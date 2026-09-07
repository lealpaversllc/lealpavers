'use server'

import { Resend } from 'resend'

import { EmailTemplate } from '@/components/email-template'
import { type ContactSchema, contactSchema } from '@/lib/schemas/contact'

export type SendEmailResult = { ok: true } | { ok: false; error: string }

const TO = process.env.CONTACT_TO_EMAIL ?? 'info@lealpaversllc.com'
const FROM =
  process.env.CONTACT_FROM_EMAIL ?? 'Leal Pavers <info@lealpaversllc.com>'

export async function SendEmail(data: ContactSchema): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set')
    return { ok: false, error: 'Email service is not configured.' }
  }

  // Never trust the client: a server action is a public endpoint.
  const parsed = contactSchema.safeParse(data)
  if (!parsed.success) {
    return { ok: false, error: 'Please check the form and try again.' }
  }

  // Honeypot filled in means a bot: pretend it worked, send nothing.
  if (parsed.data.company) {
    return { ok: true }
  }

  const { name, email, phone, address, description } = parsed.data

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New quote request — ${name}`,
      react: (
        <EmailTemplate
          name={name}
          email={email}
          phone={phone}
          address={address}
          description={description}
        />
      ),
    })

    if (error) {
      console.error('Resend error', error)
      return { ok: false, error: 'We could not send your message right now.' }
    }

    return { ok: true }
  } catch (error) {
    console.error('Resend threw', error)
    return { ok: false, error: 'We could not send your message right now.' }
  }
}
