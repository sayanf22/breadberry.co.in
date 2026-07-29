# Breadberry Co.

Marketing site for a B2B frozen berry and fruit puree supplier. Built from the
supplied desktop and mobile hero mockups with custom components — no theme or
template.

## Stack

- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript
- Tailwind CSS v4, configured entirely through `@theme` tokens in
  `src/app/globals.css`
- `next/font` — **Newsreader** for display, **Geist** for UI and body
- Server Actions for form handling. No client-side form library
- Zero runtime dependencies beyond Next, React and Tailwind

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run lint
```

## Routes

| Route                | Notes                                            |
| -------------------- | ------------------------------------------------ |
| `/`                  | Hero, trust strip, featured range, testimonials, quote CTA |
| `/products`          | Filterable grid, tab state driven by `?category=` |
| `/products/[slug]`   | Statically generated per product                  |
| `/why-us`            | Supply guarantees and process                     |
| `/about`             | Story, milestones, values                         |
| `/contact`           | Contact channels and enquiry form                 |
| `/request-a-quote`   | Bulk quote form                                   |

`sitemap.xml` and `robots.txt` are generated from `src/lib/site.ts` and
`src/lib/products.ts`.

## Project layout

```
design/            Source mockups the image assets are cut from
scripts/           Asset pipeline (see below)
src/app/           Routes, root layout, route transition, Server Actions
src/components/
  layout/          Header, portalled mobile sheet, footer, page hero, logo
  home/            Hero, TrustBar, ProductRange, Testimonials, QuoteCta
  products/        ProductCard, ProductFilter
  forms/           ContactForm, QuoteForm, status panels
  ui/              Button, Container, Reveal, Field, Monogram, VideoDialog
  icons/           Hand-built SVG set — no icon dependency
src/lib/           Site config, products, testimonials, features, helpers
```

## Image assets

The mockups arrived as flat PNGs with no separate layers, so every asset is cut
from them programmatically. All output lands in `public/assets`.

```bash
node scripts/extract-assets.mjs           # regenerate every asset
node scripts/analyse-regions.mjs          # score a crop for foliage vs. text
node scripts/preview.mjs <file> [cols] [--rect=l,t,w,h]
```

`preview.mjs` renders any image as ASCII (luminance plus alpha), which is how
the crop rectangles were measured and verified. Useful when adjusting a rect:

```bash
node scripts/preview.mjs public/assets/logo-mark.webp 86
node scripts/preview.mjs design/reference-mobile.png 96 --rect=20,0,240,168
```

`extract-assets.mjs` applies three techniques:

- **feather** — fades a cut edge to transparent where a crop slices the
  artwork's gradient, so it blends into the page with no seam
- **knockout** — flood-fills the flat background inwards from the border and
  makes it transparent. Because it only travels through connected background,
  white enclosed by artwork (the logo's lettering) survives
- **scale** — lanczos upscale plus light sharpen for small source regions

> Filenames are versioned (`logo-mark.webp`, not `logo.webp`). Next's image
> optimiser caches by URL, so replacing a file in place keeps serving the stale
> variant. If you change an asset without renaming it, clear
> `.next/cache/images`.

## Motion

Handled in CSS, no animation library:

- Route transitions via `src/app/template.tsx`, which remounts per navigation
- Scroll reveals through a self-disconnecting `IntersectionObserver`
- Marquees duplicate their list and translate exactly `-50%` for a seamless loop
- Everything collapses under `prefers-reduced-motion`

## Placeholder content

Replace before production:

- **Testimonials** (`src/lib/testimonials.ts`) — names, roles and quotes are
  invented. Avatars are initials rather than stock photography, since
  attributing a stock face to a named customer would be fabricated social proof
- **Trust strip** (`trustedBy` in `src/lib/site.ts`) — wordmarks are set as
  type, not real logos. These are third-party trademarks; get permission before
  using them
- **Form delivery** — `deliver()` in `src/app/actions.ts` only logs. Point it at
  an email provider or CRM. Validation already runs server-side
- **Video** — `VideoDialog` uses a stand-in URL
- **Contact details** — `src/lib/site.ts`
```
