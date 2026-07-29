import Link from "next/link";
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Monogram } from "@/components/ui/Monogram";
import { ArrowRightIcon } from "@/components/icons";
import {
  outcomes,
  testimonials,
  type Testimonial,
} from "@/lib/testimonials";

/* Mixed widths so the row reads as a wall of comments, not a grid. */
const cardWidth = {
  sm: "w-[15.5rem] sm:w-[17rem]",
  md: "w-[17.5rem] sm:w-[19.5rem]",
  lg: "w-[19.5rem] sm:w-[22rem]",
} as const;

/* Vertical stagger. Applied as margin so the flex row grows to contain it. */
const cardLift = ["mt-0", "mt-5 sm:mt-7", "mt-9 sm:mt-12"] as const;

function QuoteCard({ item }: { item: Testimonial }) {
  return (
    <figure
      className={cn(
        "flex shrink-0 flex-col items-center rounded-card border border-[#efe6d3] bg-cream-soft px-6 pb-6 pt-7 text-center",
        cardWidth[item.size],
        cardLift[item.offset]
      )}
    >
      <Monogram
        name={item.name}
        tone={item.tone}
        className="size-12 text-[0.875rem]"
      />

      <blockquote className="mt-5 flex-1 text-[0.9375rem] leading-relaxed text-ink/85">
        “{item.quote}”
      </blockquote>

      <figcaption className="mt-6 w-full border-t border-[#ece2cd] pt-4 text-[0.75rem] leading-relaxed text-muted">
        <span className="font-semibold text-navy">{item.name}</span>
        <span className="text-muted-soft">, </span>
        {item.role}
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const track = [...testimonials, ...testimonials];

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="pb-[clamp(3rem,7vw,5.5rem)]"
    >
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <Eyebrow tone="green">Trusted in professional kitchens</Eyebrow>
          <h2 id="testimonials-heading" className="mt-3 max-w-[26ch] text-h2">
            What chefs and buyers tell us
          </h2>
        </Reveal>
      </Container>

      {/* Full-bleed quote row */}
      <Reveal
        delay={80}
        className="edge-fade mt-[clamp(1.5rem,3vw,2.25rem)] overflow-hidden"
      >
        <ul
          className="marquee-track items-start gap-4 px-2 pb-3"
          style={{ "--marquee-duration": "88s" } as CSSProperties}
        >
          {track.map((item, index) => (
            <li
              key={`${item.name}-${index}`}
              aria-hidden={index >= testimonials.length}
              className="flex"
            >
              <QuoteCard item={item} />
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Outcome bento — wide and narrow cards alternate down the grid */}
      <Container>
        <div className="mt-[clamp(1.5rem,3vw,2.25rem)] grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {outcomes.map((item, index) => {
            const wide = item.size === "lg";
            return (
              <Reveal
                key={item.title}
                delay={index * 80}
                className={cn("h-full", wide ? "lg:col-span-7" : "lg:col-span-5")}
              >
                <Link
                  href={item.href}
                  className="group relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-card bg-forest p-[clamp(1.375rem,2.6vw,2.125rem)] transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-lift"
                >
                  <span aria-hidden className="sheen" />

                  {/* Interior light, stronger on the wide cards */}
                  <span
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(70% 80% at 100% 0%, rgb(255 255 255 / .08) 0%, transparent 66%)",
                    }}
                  />

                  <div className="relative z-2 flex items-start justify-between gap-5">
                    <div>
                      <h3
                        className={cn(
                          "max-w-[22ch] font-display leading-[1.15] text-cream",
                          wide
                            ? "text-[clamp(1.5rem,1.15rem+1.4vw,2.125rem)]"
                            : "text-[clamp(1.3125rem,1.1rem+0.9vw,1.75rem)]"
                        )}
                      >
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-[38ch] text-[0.9375rem] leading-relaxed text-cream/70">
                        “{item.quote}”
                      </p>
                    </div>

                    <span
                      aria-hidden
                      className="grid size-9 shrink-0 place-items-center rounded-full border border-cream/25 text-cream transition-[border-color,transform] duration-500 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-cream/60"
                    >
                      <ArrowRightIcon className="size-4 -rotate-45" />
                    </span>
                  </div>

                  <div className="relative z-2 flex items-center gap-3">
                    <Monogram
                      name={item.name}
                      onDark
                      className="size-9 text-[0.6875rem]"
                    />
                    <span className="min-w-0 text-[0.75rem] leading-snug">
                      <span className="block truncate font-semibold text-cream">
                        {item.name}
                      </span>
                      <span className="block truncate text-cream/55">
                        {item.role}
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
