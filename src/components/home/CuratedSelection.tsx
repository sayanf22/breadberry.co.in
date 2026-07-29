import Link from "next/link";
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/icons";
import { portfolio, type PortfolioCategory } from "@/lib/portfolio";

/**
 * One light tint per category.
 *
 * `surface` stays pale enough to hold navy headings and body copy at AA.
 * `ring` and `glow` feed the shared `.card-surface` custom properties so the
 * hover treatment follows the card's own colour instead of the default blue.
 */
const palettes = {
  berry: {
    surface: "bg-[#fdf0f3]",
    icon: "text-berry",
    link: "text-berry hover:text-[#a12b40]",
    ring: "rgb(192 56 79 / 0.42)",
    ringMid: "rgb(192 56 79 / 0.16)",
    glow: "rgb(192 56 79 / 0.08)",
  },
  green: {
    surface: "bg-[#edf6ef]",
    icon: "text-green-deep",
    link: "text-green-deep hover:text-green-deeper",
    ring: "rgb(20 120 90 / 0.42)",
    ringMid: "rgb(20 120 90 / 0.16)",
    glow: "rgb(20 120 90 / 0.08)",
  },
  amber: {
    surface: "bg-[#fdf6e7]",
    icon: "text-[#a4761c]",
    link: "text-[#a4761c] hover:text-[#7f5a12]",
    ring: "rgb(164 118 28 / 0.42)",
    ringMid: "rgb(164 118 28 / 0.16)",
    glow: "rgb(164 118 28 / 0.09)",
  },
  blue: {
    surface: "bg-[#eef4fd]",
    icon: "text-blue",
    link: "text-blue hover:text-[#1668a8]",
    ring: "rgb(30 127 201 / 0.42)",
    ringMid: "rgb(30 127 201 / 0.16)",
    glow: "rgb(30 127 201 / 0.08)",
  },
  teal: {
    surface: "bg-[#e9f4f6]",
    icon: "text-[#1c7d88]",
    link: "text-[#1c7d88] hover:text-[#14636c]",
    ring: "rgb(28 125 136 / 0.42)",
    ringMid: "rgb(28 125 136 / 0.16)",
    glow: "rgb(28 125 136 / 0.08)",
  },
} as const;

export function CategoryCard({
  category,
  /** Renders the card as the dark hero of the grid. */
  featured = false,
  className,
}: {
  category: PortfolioCategory;
  featured?: boolean;
  className?: string;
}) {
  const { icon: Icon, name, summary, detail, tone, hasCatalogue } = category;
  const palette = palettes[tone];

  if (featured) {
    return (
      <div
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-card bg-night p-[clamp(1.5rem,2.8vw,2.25rem)]",
          "transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-lift",
          className
        )}
      >
        <span aria-hidden className="sheen" />
        <span
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(62% 70% at 100% 0%, rgb(192 56 79 / .18) 0%, transparent 68%)",
          }}
        />

        <span className="relative z-2 grid size-[3.25rem] place-items-center rounded-[1.125rem] bg-white/10 text-cream">
          <Icon className="size-[1.4rem]" />
        </span>

        <h3 className="relative z-2 mt-6 max-w-[22ch] font-display text-[clamp(1.375rem,1.15rem+0.9vw,1.875rem)] leading-[1.16] text-cream">
          {name}
        </h3>

        <p className="relative z-2 mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-cream/78">
          {summary}
        </p>
        <p className="relative z-2 mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-cream/60">
          {detail}
        </p>

        {hasCatalogue && (
          <Link
            href="/products#range"
            className="relative z-2 mt-auto inline-flex w-fit items-center gap-1.5 pt-7 text-[0.8125rem] font-medium text-mint transition-colors duration-300 hover:text-cream"
          >
            Browse the range
            <ArrowRightIcon className="size-[0.95rem] transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "card-surface group flex h-full flex-col p-[clamp(1.25rem,2.2vw,1.75rem)]",
        palette.surface,
        className
      )}
      style={
        {
          "--card-ring": palette.ring,
          "--card-ring-mid": palette.ringMid,
          "--card-glow": palette.glow,
        } as CSSProperties
      }
    >
      <span className={cn("icon-tile bg-white/85", palette.icon)}>
        <Icon className="size-[1.4rem]" />
      </span>

      <h3 className="mt-5 text-[1rem] font-semibold leading-snug tracking-[-0.012em] text-navy">
        {name}
      </h3>

      {/* Slightly darker than --color-muted: the tints drop the default to
          ~4.4:1, just under AA. This clears 5:1 on all five surfaces. */}
      <p className="mt-2.5 flex-1 text-[#54697b]">{summary}</p>

      {hasCatalogue && (
        <Link
          href="/products#range"
          className={cn(
            "relative z-2 mt-5 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium transition-colors duration-300",
            palette.link
          )}
        >
          Browse the range
          <ArrowRightIcon className="size-[0.95rem] transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

/**
 * Bento grid: the signature line takes a dark, wider cell so the portfolio
 * has an obvious entry point, with the other four categories as light tints.
 * Twelve columns on desktop — 7/5 on the first row, then three equal cells.
 */
export function PortfolioGrid() {
  return (
    <div className="grid gap-[clamp(0.75rem,1.6vw,1.25rem)] sm:grid-cols-2 lg:grid-cols-12">
      {portfolio.map((category, index) => (
        <Reveal
          key={category.slug}
          delay={index * 70}
          className={cn(
            "h-full",
            index === 0 && "sm:col-span-2 lg:col-span-7",
            index === 1 && "lg:col-span-5",
            index > 1 && "lg:col-span-4"
          )}
        >
          <CategoryCard category={category} featured={index === 0} />
        </Reveal>
      ))}
    </div>
  );
}

export function CuratedSelection() {
  return (
    <section
      aria-labelledby="selection-heading"
      className="py-[clamp(3rem,7vw,5.5rem)]"
    >
      <Container>
        <Reveal>
          <div className="flex flex-col gap-5 border-b border-line pb-[clamp(1.25rem,2.5vw,1.75rem)] lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div>
              <Eyebrow>Our curated selection</Eyebrow>
              <h2 id="selection-heading" className="mt-3 max-w-[24ch] text-h2">
                Five categories, one standard
              </h2>
            </div>
            <p className="text-muted lg:max-w-[26ch] lg:text-right">
              Premium global ingredients, curated for professional kitchens.
            </p>
          </div>
        </Reveal>

        <div className="mt-[clamp(1.5rem,3.5vw,2.25rem)]">
          <PortfolioGrid />
        </div>
      </Container>
    </section>
  );
}
