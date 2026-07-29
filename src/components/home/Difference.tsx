import Link from "next/link";
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/icons";
import { commitments, proofPoints, type Commitment } from "@/lib/features";
import { site } from "@/lib/site";

/* Mixed widths so the row reads as a wall of notes, not a grid. */
const cardWidth = {
  sm: "w-[15.5rem] sm:w-[17rem]",
  md: "w-[17.5rem] sm:w-[19.5rem]",
  lg: "w-[19.5rem] sm:w-[22rem]",
} as const;

/* Vertical stagger, applied as margin so the flex row grows to contain it. */
const cardLift = ["mt-0", "mt-5 sm:mt-7", "mt-9 sm:mt-12"] as const;

const iconTones = {
  blue: "bg-blue-soft text-blue",
  green: "bg-[#e6f2ea] text-green-deep",
  berry: "bg-[#fbe6eb] text-berry",
  amber: "bg-[#fbf1d9] text-[#a4761c]",
  teal: "bg-[#e4f1f3] text-[#1c7d88]",
} as const;

function CommitmentCard({ item }: { item: Commitment }) {
  const { icon: Icon } = item;

  return (
    <article
      className={cn(
        "flex shrink-0 flex-col items-center rounded-card border border-[#efe6d3] bg-cream-soft px-6 pb-6 pt-7 text-center",
        cardWidth[item.size],
        cardLift[item.offset]
      )}
    >
      <span
        className={cn(
          "grid size-12 shrink-0 place-items-center rounded-full",
          iconTones[item.tone]
        )}
      >
        <Icon className="size-[1.35rem]" />
      </span>

      <h3 className="mt-5 text-[1rem] font-semibold leading-snug tracking-[-0.012em] text-navy">
        {item.title}
      </h3>

      <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-[#54697b]">
        {item.body}
      </p>

      <p className="mt-6 w-full border-t border-[#ece2cd] pt-4 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted-soft">
        {item.tag}
      </p>
    </article>
  );
}

export function Difference() {
  const track = [...commitments, ...commitments];

  return (
    <section
      aria-labelledby="difference-heading"
      className="pb-[clamp(3rem,7vw,5.5rem)]"
    >
      {/* Full-bleed dark slab. Sits outside the page container so it reaches
          both viewport edges, rounded on all four corners so it reads as a
          block tucked between the sections above and below. */}
      <div className="relative isolate overflow-hidden rounded-[clamp(1.5rem,4vw,2.75rem)] bg-night py-[clamp(2.75rem,6.5vw,4.5rem)]">
        {/* Faint green wash only — a blue glow is what made the black read
            as navy in the first place. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(46% 60% at 50% -8%, rgb(127 201 166 / .1) 0%, transparent 70%), radial-gradient(38% 52% at 92% 106%, rgb(20 120 90 / .16) 0%, transparent 72%)",
          }}
        />

        <Container>
          <Reveal className="flex flex-col items-center text-center">
            <Eyebrow tone="mint">
              The {site.company.split(" ")[0]} difference
            </Eyebrow>
            <h2
              id="difference-heading"
              className="mt-3 max-w-[26ch] text-h2 text-cream"
            >
              Trust is built on consistency
            </h2>
            <p className="text-lead mt-4 max-w-[52ch] text-cream/65">
              We treat your ingredients with the same care and exactness you
              apply to your final presentation.
            </p>
          </Reveal>
        </Container>

        {/* Commitment row */}
        <Reveal
          delay={80}
          className="edge-fade mt-[clamp(1.75rem,3.5vw,2.5rem)] overflow-hidden"
        >
          <ul
            className="marquee-track items-start gap-4 px-2 pb-3"
            style={{ "--marquee-duration": "92s" } as CSSProperties}
          >
            {track.map((item, index) => (
              <li
                key={`${item.title}-${index}`}
                aria-hidden={index >= commitments.length}
                className="flex"
              >
                <CommitmentCard item={item} />
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Proof bento — wide and narrow cards alternate down the grid */}
        <Container>
          <div className="mt-[clamp(1.5rem,3vw,2.25rem)] grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
            {proofPoints.map((item, index) => {
              const wide = item.size === "lg";
              return (
                <Reveal
                  key={item.title}
                  delay={index * 80}
                  className={cn(
                    "h-full",
                    wide ? "lg:col-span-7" : "lg:col-span-5"
                  )}
                >
                  <Link
                    href={item.href}
                    className="group relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-card border border-cream/12 bg-forest-mid p-[clamp(1.375rem,2.6vw,2.125rem)] transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-cream/25 hover:shadow-lift"
                  >
                  <span aria-hidden className="sheen" />
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
                      {/* /78 not /70: on the lifted green, 70% lands at
                          4.42:1, just under AA for body text. */}
                      <p className="mt-3 max-w-[40ch] text-[0.9375rem] leading-relaxed text-cream/78">
                        {item.note}
                      </p>
                    </div>

                    <span
                      aria-hidden
                      className="grid size-9 shrink-0 place-items-center rounded-full border border-cream/25 text-cream transition-[border-color,transform] duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-cream/60"
                    >
                      <ArrowRightIcon className="size-4 -rotate-45" />
                    </span>
                  </div>

                    <span className="relative z-2 inline-flex items-center gap-1.5 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-cream/75 transition-colors duration-400 group-hover:text-cream">
                      {item.cta}
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </div>
    </section>
  );
}
