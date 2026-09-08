'use server'

import { headers } from 'next/headers'
import { Resend } from 'resend'

import { EmailTemplate } from '@/components/email-template'
import { log } from '@/lib/log'
import { rateLimit } from '@/lib/rate-limit'
import { type ContactSchema, contactSchema } from '@/lib/schemas/contact'

export type SendEmailResult = { ok: true } | { ok: false; error: string }

const TO = process.env.CONTACT_TO_EMAIL ?? 'info@lealpaversdesign.com'
const FROM =
  process.env.CONTACT_FROM_EMAIL ?? 'Leal Pavers <info@lealpaversdesign.com>'

/** A real visitor sends one quote request, maybe two. Five in 10 min is plenty. */
const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 }

const GENERIC_FAILURE = 'We could not send your message right now.'

async function clientIp(): Promise<string> {
  const h = await headers()
  const forwarded = h.get('x-forwarded-for')
  // First hop is the client; later hops are proxies appended by the platform.
  return forwarded?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown'
}

export async function SendEmail(data: ContactSchema): Promise<SendEmailResult> {
  try {
    return await sendEmail(data)
  } catch (error) {
    // Anything that escaped the happy path below (headers(), Resend client
    // construction, ...). Log it with a stack and keep the response friendly
    // instead of letting Next surface a bare "server error".
    log.error('contact.unexpected', {}, error)
    return { ok: false, error: GENERIC_FAILURE }
  }
}

async function sendEmail(data: ContactSchema): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    log.error('contact.misconfigured', { missing: 'RESEND_API_KEY' })
    return { ok: false, error: 'Email service is not configured.' }
  }

  const ip = await clientIp()

  // Never trust the client: a server action is a public endpoint.
  const parsed = contactSchema.safeParse(data)
  if (!parsed.success) {
    log.warn('contact.invalid_payload', {
      ip,
      issues: parsed.error.issues.map((i) => ({
        path: i.path.join('.'),
        code: i.code,
      })),
    })
    return { ok: false, error: 'Please check the form and try again.' }
  }

  const { name, email, phone, address, description, company } = parsed.data

  // Honeypot filled in means a bot: pretend it worked, send nothing.
  if (company) {
    log.info('contact.honeypot', { ip, email })
    return { ok: true }
  }

  // Throttle after the honeypot so bots do not burn a real visitor's quota
  // behind a shared NAT, and after validation so junk payloads are free.
  const limited = rateLimit(`contact:${ip}`, RATE_LIMIT)
  if (!limited.ok) {
    const minutes = Math.max(1, Math.ceil(limited.retryAfterMs / 60_000))
    log.warn('contact.rate_limited', {
      ip,
      email,
      retryAfterMs: limited.retryAfterMs,
    })
    return {
      ok: false,
      error: `Too many requests. Please try again in ${minutes} minute${minutes === 1 ? '' : 's'}.`,
    }
  }

  const { data: sent, error } = await new Resend(apiKey).emails.send({
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
    log.error('contact.resend_error', { ip, email, resend: error })
    return { ok: false, error: GENERIC_FAILURE }
  }

  log.info('contact.sent', { ip, email, resendId: sent?.id })
  return { ok: true }
}
