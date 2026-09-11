'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { privacyPolicy } from '@/data/privacy-policy'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

/**
 * Footer "Privacy Policy" entry. Renders as a text button styled like the
 * neighbouring quick links and opens the policy in a modal instead of
 * navigating away from the page.
 */
export function PrivacyPolicyDialog({ className }: { className?: string }) {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          'ease-soft hover:text-accent-300 cursor-pointer rounded-sm text-left transition-colors duration-200',
          className,
        )}
      >
        Privacy Policy
      </DialogTrigger>

      <DialogContent className="text-foreground flex max-h-[85dvh] flex-col gap-0 p-0 sm:max-w-2xl">
        <DialogHeader className="border-b px-6 pt-6 pb-4 text-left">
          <DialogTitle className="text-brand-600 font-display text-h3">
            {privacyPolicy.title}
          </DialogTitle>
          <DialogDescription>
            Effective Date: {privacyPolicy.effectiveDate}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 overflow-y-auto px-6 py-5 text-sm leading-relaxed">
          {privacyPolicy.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <p>{privacyPolicy.usesLead}</p>
          <ul className="list-disc space-y-1 pl-5">
            {privacyPolicy.uses.map((use) => (
              <li key={use}>{use}</li>
            ))}
          </ul>

          {privacyPolicy.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <p className="font-semibold">
            {privacyPolicy.contact.name}
            <br />
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-600 hover:text-accent-ink font-normal underline underline-offset-4"
            >
              {privacyPolicy.contact.site}
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
