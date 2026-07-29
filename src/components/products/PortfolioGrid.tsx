import Link from "next/link";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/icons";
import { portfolio, type PortfolioCategory } from "@/lib/portfolio";

/**
 * One light tint per category.
 *
 * Deliberately restrained: a plain line icon in the accent colour, a serif
 * heading and a catalogue-style index number. No filled icon tiles, gradients
 * or dark hero cell — that vocabulary reads as software, not as an ingredients
 * supplier's product sheet.
 */
const palettes = {
  berry: {
    surface: "bg-[#fdf1f4]",
    border: "border-[#f4dbe1]",
    accent: "text-berry",
    rule: "bg-berry/25",
    link: "text-berry hover:text-[#a12b40]",
  },
  green: {
    surface: "bg-lime-panel",
    border: "border-[#dcecd0]",
    accent: "text-green-deep",
    rule: "bg-green-deep/25",
    link: "text-green-deep hover:text-green-deeper",
  },
  amber: {
    surface: "bg-[#fdf7e9]",
    border: "border-[#f2e5c6]",
    accent: "text-[#a4761c]",
    rule: "bg-[#a4761c]/25",
    link: "text-[#a4761c] hover:text-[#7f5a12]",
  },
  blue: {
    surface: "bg-[#eff5fd]",
    border: "border-[#d9e6f6]",
    accent: "text-blue",
    rule: "bg-blue/25",
    link: "text-blue hover:text-[#1668a8]",
  },
  teal: {
    surface: "bg-[#eaf5f6]",
    border: "border-[#d3e7e9]",
    accent: "text-[#1c7d88]",
    rule: "bg-[#1c7d88]/25",
    link: "text-[#1c7d88] hover:text-[#14636c]",
  },
} as const;

function Index({ n, className }: { n: number; className?: string }) {
  return (
    <span
      className={cn(
        "text-[0.6875rem] font-medium tabular-nums tracking-[0.18em] text-muted-soft",
        className
      )}
    >
      {String(n).padStart(2, "0")}
    </span>
  );
}

/** Wide horizontal card used for the signature line. */
function SignatureCard({
  category,
  index,
}: {
  category: PortfolioCategory;
  index: number;
}) {
  const { icon: Icon, name, summary, detail, tone } = category;
  const p = palettes[tone];

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-card border p-[clamp(1.375rem,2.6vw,2.25rem)]",
        "transition-[border-color,box-shadow] duration-500 ease-[var(--ease-out-soft)] hover:shadow-soft",
        p.surface,
        p.border
      )}
    >
      {/* Accent rule along the top edge */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 h-[3px] origin-left scale-x-[0.18] transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-x-100",
          p.rule
        )}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
        <div>
          <div className="flex items-center gap-3">
            <Index n={index} />
            <span className={cn("text-[0.6875rem] font-medium uppercase tracking-[0.16em]", p.accent)}>
              Signature range
            </span>
          </div>

          <div className="mt-5 flex items-start gap-4">
            <Icon className={cn("mt-1 size-6 shrink-0", p.accent)} />
            <h3 className="font-display text-[clamp(1.375rem,1.15rem+0.9vw,1.875rem)] leading-[1.18] text-navy">
              {name}
            </h3>
          </div>
        </div>

        <div>
          <p className="text-[0.9375rem] leading-relaxed text-[#4e6373]">
            {summary}
          </p>
          {/* #586c7e, not --color-muted: on these tints the default grey
              measures 4.44:1, a hair under AA. */}
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-[#586c7e]">
            {detail}
          </p>

          <Link
            href="#range"
            className={cn(
              "mt-6 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium transition-colors duration-300",
              p.link
            )}
          >
            Browse the range
            <ArrowRightIcon className="size-[0.95rem] transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function CategoryCard({
  category,
  index,
}: {
  category: PortfolioCategory;
  index: number;
}) {
  const { icon: Icon, name, summary, tone } = category;
  const p = palettes[tone];

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-card border p-[clamp(1.25rem,2.2vw,1.625rem)]",
        "transition-[border-color,box-shadow,transform] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-soft",
        p.surface,
        p.border
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-x-100",
          p.rule
        )}
      />

      <div className="flex items-start justify-between gap-4">
        <Index n={index} />
        <Icon className={cn("size-[1.35rem] shrink-0", p.accent)} />
      </div>

      <h3 className="mt-6 font-display text-[1.1875rem] leading-[1.24] text-navy">
        {name}
      </h3>

      {/* #4e6373 rather than --color-muted: the tints drop the default grey
          to ~4.4:1, just under AA for body copy. */}
      <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-[#4e6373]">
        {summary}
      </p>
    </article>
  );
}

export function PortfolioGrid() {
  const [signature, ...rest] = portfolio;

  return (
    <div className="space-y-[clamp(0.75rem,1.6vw,1.25rem)]">
      <Reveal>
        <SignatureCard category={signature} index={1} />
      </Reveal>

      <div className="grid gap-[clamp(0.75rem,1.6vw,1.25rem)] sm:grid-cols-2 lg:grid-cols-4">
        {rest.map((category, i) => (
          <Reveal key={category.slug} delay={i * 70} className="h-full">
            <CategoryCard category={category} index={i + 2} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
