import { z } from 'zod'

/**
 * Shared between the client form and the server action.
 * Kept free of `'use client'` so the server can re-validate the payload:
 * a server action is a public endpoint and cannot trust the browser.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Please enter your name.' })
    .max(80, { message: 'Name is too long.' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email.' })
    .max(120, { message: 'Email is too long.' }),
  phone: z
    .string()
    .trim()
    .min(1, { message: 'Please enter your phone number.' })
    .max(30, { message: 'Phone number is too long.' })
    .refine((value) => (value.match(/\d/g) ?? []).length >= 10, {
      message: 'Please enter a valid phone number.',
    }),
  address: z
    .string()
    .trim()
    .max(160, { message: 'Address is too long.' })
    .optional(),
  description: z
    .string()
    .trim()
    .max(2000, { message: 'Please keep it under 2000 characters.' })
    .optional(),
  /** Honeypot: hidden from people, filled in by bots. Must stay empty. */
  company: z.string().max(0).optional(),
})

export type ContactSchema = z.infer<typeof contactSchema>
