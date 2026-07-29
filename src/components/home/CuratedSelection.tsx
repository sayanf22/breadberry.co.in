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
 * `surface` stays pale enough to hold navy headings and muted body copy at AA.
 * `ring` and `glow` feed the shared `.card-surface` custom properties so the
 * hover treatment follows the card's own colour instead of the default blue.
 * The icon tile is white on tint, which reads crisper than a deeper tint tile.
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
  className,
}: {
  category: PortfolioCategory;
  className?: string;
}) {
  const { icon: Icon, name, summary, tone, hasCatalogue } = category;
  const palette = palettes[tone];

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
            <p className="text-muted lg:max-w-[38ch] lg:text-right">
              We source and supply a meticulously curated portfolio of premium
              global ingredients for executive chefs, pastry chefs and specialty
              bakers.
            </p>
          </div>
        </Reveal>

        <div className="mt-[clamp(1.5rem,3.5vw,2.25rem)] grid gap-[clamp(0.75rem,1.6vw,1.25rem)] sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((category, index) => (
            <Reveal
              key={category.slug}
              delay={index * 70}
              className={cn(
                "h-full",
                // The signature line takes the wider slot on large screens.
                index === 0 && "lg:col-span-2"
              )}
            >
              <CategoryCard category={category} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
