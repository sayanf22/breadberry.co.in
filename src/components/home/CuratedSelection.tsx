import Link from "next/link";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/icons";
import { portfolio, type PortfolioCategory } from "@/lib/portfolio";

const tones = {
  blue: "bg-blue-soft text-blue",
  green: "bg-[#e6f2ea] text-green-deep",
  berry: "bg-[#fbe6eb] text-berry",
  amber: "bg-[#fbf1d9] text-[#a4761c]",
} as const;

export function CategoryCard({
  category,
  className,
}: {
  category: PortfolioCategory;
  className?: string;
}) {
  const { icon: Icon, name, summary, tone, hasCatalogue } = category;

  return (
    <div
      className={cn(
        "card-surface group flex h-full flex-col p-[clamp(1.25rem,2.2vw,1.75rem)]",
        className
      )}
    >
      <span className={cn("icon-tile", tones[tone])}>
        <Icon className="size-[1.4rem]" />
      </span>

      <h3 className="mt-5 text-[1rem] font-semibold leading-snug tracking-[-0.012em] text-navy">
        {name}
      </h3>

      <p className="mt-2.5 flex-1 text-muted">{summary}</p>

      {hasCatalogue && (
        <Link
          href="/products#range"
          className="relative z-2 mt-5 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-green-deep transition-colors duration-300 hover:text-green-deeper"
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
              <h2
                id="selection-heading"
                className="mt-3 max-w-[24ch] text-h2"
              >
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
