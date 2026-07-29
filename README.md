# Breadberry Co.

Marketing site for **Breadberry Co.**, the signature brand of **Adhira Enterprises** —
a Mumbai-based procurement partner supplying premium global ingredients to 5-star
hotels, fine-dining restaurants, premium confectioneries and artisanal bakers.
Built from the supplied desktop and mobile hero mockups with custom components —
no theme or template.

## Stack

- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript
- Tailwind CSS v4, configured entirely through `@theme` tokens in
  `src/app/globals.css`
- `next/font` — **Newsreader** for display, **Geist** for UI and body
- Server Actions for form handling. No client-side form library
- Zero runtime dependencies beyond Next, React and Tailwind

## Browser support

Tailwind CSS v4 compiles to `oklch()`, `color-mix()` and `@property`, so its own
floor is the floor here:

| Browser | Minimum |
| ------- | ------- |
| Chrome / Edge | 111 |
| Safari (macOS + iOS) | 16.4 |
| Firefox | 128 |

Below that, colours degrade rather than the layout collapsing. Everything the
site adds on top of Tailwind stays inside that envelope:

- `mask-image` and `mask-composite` ship with `-webkit-` prefixes
- `backdrop-filter` ships with `-webkit-backdrop-filter` (Tailwind emits both)
- `overflow: clip` (Safari 16) is used instead of `hidden` on `body`, so it
  never becomes a scroll container and breaks the sticky header
- Checkbox state uses `:checked` and sibling (`peer-checked`) selectors, not
  `:has()`. `:has()` only adds the label tint, so the control still reads
  correctly without it
- `text-wrap: pretty` and `inert` are progressive enhancements. The mobile sheet
  is `visibility: hidden` when closed, which already removes it from the tab
  order, so `inert` is belt-and-braces

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
  home/            Hero, ClientStrip, CuratedSelection, ProductRange, Difference, QuoteCta
  products/        ProductCard, ProductFilter
  forms/           ContactForm, QuoteForm, status panels
  ui/              Button, Container, Reveal, Field, VideoDialog
  icons/           Hand-built SVG set — no icon dependency
src/lib/           Site + client config, portfolio categories, products, features
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

## Content sources

Company details, the curated selection and the client list are taken from
material supplied by Adhira Enterprises and live in:

- `src/lib/site.ts` — company, founder, city, client list
- `src/lib/portfolio.ts` — the five ingredient categories
- `src/lib/features.ts` — the Adhira difference
- `src/lib/products.ts` — the Breadberry Co. berry and puree catalogue

## Placeholder content

Replace before production:

- **Contact details** (`src/lib/site.ts`) — phone and email are placeholders,
  marked with a `TODO`
- **Client wordmarks** (`clientsRowOne` / `clientsRowTwo`) — set as type, not
  real logos. These are third-party trademarks; confirm permission to display
  them before launch
- **Product catalogue** (`src/lib/products.ts`) — the eight berry and puree SKUs
  carry indicative pack sizes and Brix ranges. Confirm against real spec sheets
- **Form delivery** — `deliver()` in `src/app/actions.ts` only logs. Point it at
  an email provider or CRM. Validation already runs server-side
- **Video** — `VideoDialog` uses a stand-in URL

No customer testimonials are shown. Named quotes were removed rather than
invented; add them once real, attributable ones are available.
```

## Cloudflare Workers deployment

The OpenNext adapter and Wrangler are pinned so CI does not auto-migrate the
repository during each deployment. In Cloudflare Workers Builds, use:

- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy`
- **Root directory:** the repository root

For a local one-command deployment, use `npm run deploy`. The Worker and its
`WORKER_SELF_REFERENCE` service binding are both named `breadberry`; these names
must remain identical. Generated `.open-next` and `.wrangler` output is ignored.
