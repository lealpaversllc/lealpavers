# Leal Pavers

Marketing site for [Leal Pavers LLC](https://lealpaversllc.com) — paver
installation, repair and sealing in Raleigh, North Carolina.

Built with Next.js 15 (App Router), React 19, Tailwind CSS v4 and shadcn/ui.

## Getting started

```bash
bun install
cp .env.example .env.local   # then fill in RESEND_API_KEY
bun run dev
```

## Environment

| Variable             | Required | Purpose                                          |
| -------------------- | -------- | ------------------------------------------------ |
| `RESEND_API_KEY`     | yes      | Sends contact form submissions through Resend.    |
| `CONTACT_TO_EMAIL`   | no       | Inbox for leads. Defaults to `info@lealpaversllc.com`. |
| `CONTACT_FROM_EMAIL` | no       | Verified Resend sender.                           |

Without `RESEND_API_KEY` the form renders and validates, but submitting
returns a configuration error instead of sending.

## Editing site content

Copy lives in `src/data/`, not in the components:

| File              | Contents                                                  |
| ----------------- | --------------------------------------------------------- |
| `site.ts`         | Phone, email, social profiles, service area, navigation.    |
| `services.ts`     | The eight service cards, their copy and photo galleries.    |
| `testimonials.ts` | Customer reviews shown in the testimonials section.         |
| `projects.ts`     | Hero slides and the before/after comparisons.               |
| `stats.ts`        | The "years of experience" and "customers served" figures.   |

Changing a phone number or adding a review means editing one file — the
header, footer, contact section and the `LocalBusiness` structured data all
read from the same source.

## Images

`public/` holds only optimized WebP. The uncompressed originals live in
`assets-source/`, which is gitignored — **keep a backup of that folder.**

```bash
bun run optimize:images
```

That regenerates `public/` from `assets-source/`, recompresses the rasters
embedded in `logo.svg`, and rebuilds the app icons and the Open Graph image.
Add new photos to `assets-source/assets/...` and re-run it.

## Scripts

| Command                  | What it does                                   |
| ------------------------ | ---------------------------------------------- |
| `bun run dev`            | Dev server with Turbopack.                      |
| `bun run build`          | Production build (also type-checks and lints).  |
| `bun run lint`           | ESLint + Prettier.                              |
| `bun run optimize:images`| Rebuild every generated image asset.            |
