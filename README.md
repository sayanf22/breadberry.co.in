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
design/            Supplied logo artwork + source mockups assets are cut from
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

## Brand mark, favicons and social card

The logo is built from the supplied artwork at `design/logo-source.png`, not cut
from a mockup:

```bash
node scripts/build-logo-assets.mjs
```

One command produces every branded asset:

| Output                             | Purpose                                  |
| ---------------------------------- | ---------------------------------------- |
| `public/assets/logo-mark.webp`     | Header and footer, 384×225, transparent   |
| `public/assets/logo-mark.png`      | `Organization.logo` for crawlers, 512w    |
| `public/favicon.ico`               | 16/32/48 bundled, legacy and bookmarks    |
| `public/icons/favicon-{16,32,48}.png` | Modern browser tabs                    |
| `public/icons/icon-{192,512}.png`  | PWA manifest, `purpose: any`              |
| `public/icons/maskable-512.png`    | Android adaptive, inset to the safe zone  |
| `public/icons/apple-touch-icon.png`| 180×180, flattened — iOS ignores alpha    |
| `public/og.jpg`                    | 1200×630 share card                       |

The white backdrop is removed with a **border-seeded flood fill**, not a global
"near-white is transparent" threshold. That distinction matters: the wordmark is
white script type inside the purple banner, and a global threshold punches
straight through it. Only white reachable from the canvas edge is cut, then edge
pixels get a partial alpha so the artwork keeps its anti-aliased edge instead of
going jagged.

Two constraints worth knowing before changing sizes:

- `images.unoptimized` is on, so Next serves `src` verbatim and `sizes` cannot
  shrink the download. The WebP is generated at the size the UI actually paints
  (96 CSS px at most, so 384px covers a 3× phone). A 960px master put 128 KB on
  the critical path for a 96 px image; the shipped file is 32 KB.
- `LOGO_W` / `LOGO_H` in `src/components/layout/Logo.tsx` must match the
  generated WebP or the reserved box shifts on load.

`<Logo>` is the single source for both placements. The footer passes `onDark`,
which sits the mark on a cream plate — the deep purple banner otherwise sinks
into the near-black slab — and `subLabel={false}`, because the copy beside it
already names the parent company.

## Image assets

The mockups arrived as flat PNGs with no separate layers, so the hero and
product crops are cut from them programmatically. All output lands in
`public/assets`.

```bash
node scripts/extract-assets.mjs           # regenerate hero and tint assets
node scripts/analyse-regions.mjs          # score a crop for foliage vs. text
node scripts/preview.mjs <file> [cols] [--rect=l,t,w,h]
```

> `extract-assets.mjs` no longer touches the logo. Re-running it will not
> overwrite the generated brand assets.

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

## Product photography pipeline

The catalogue in `src/lib/products.ts` is driven by the photography supplied in
`../images` (one archive per range). To re-import after new archives arrive:

1. Extract the archives into `../images/extracted/<Range Name>/`.
2. Run `node scripts/import-product-assets.mjs`.

The script normalises every photo to a single portrait WebP
(`public/assets/products/<slug>.webp`, 780×1040, ~37 KB average) that serves
both the card crop and the taller detail crop, and writes
`scripts/product-assets.manifest.json` for reference. Each product `slug` in
`products.ts` matches its generated file name, so a missing image is obvious.

Two things to know:

- **Artisanal Cheese** and **Specialty Asian Dry Groceries** are still pending.
  The cheese archive arrived empty (a folder, no images) and the dry grocery
  range has not been supplied, so neither has products. Both still appear in the
  portfolio, without a catalogue link. Drop the archives into `../images` and
  re-run the two scripts to add them.
- **Product names match the supplied image names exactly**, at the client's
  instruction — including spellings such as "Porchini", "Shisho", "Snowpeas"
  and "Lotusroot". `node scripts/check-product-names.mjs` enforces this and
  fails if a name, image or slug drifts.
- **Pack sizes read "On request"** rather than published weights, and storage
  temperatures follow the category. Confirm both against real spec sheets
  before launch.
