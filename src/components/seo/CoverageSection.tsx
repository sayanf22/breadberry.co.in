import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { primaryHubs, stateCoverage } from "@/lib/coverage";
import { site } from "@/lib/site";

/**
 * Delivery coverage, as one honest section.
 *
 * This is deliberately a single section rather than a page per city: current
 * guidance is that fewer, purposeful pages outperform near-duplicate location
 * pages, which risk being treated as doorway pages. The state list gives real
 * geographic context for readers and for `areaServed` in structured data.
 */
export function CoverageSection() {
  return (
    <section
      aria-labelledby="coverage-heading"
      className="py-[clamp(2.5rem,6vw,4.5rem)]"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={`Shipping from ${site.city}`}
            title={
              <span id="coverage-heading">
                Cold-chain delivery across India
              </span>
            }
            description={`We are based in ${site.city} and supply professional kitchens nationwide. Lead times vary by region, so ask ${site.contact} for a delivery schedule for your city.`}
          />
        </Reveal>

        {/* Metro hubs first — these are the routes we quote most often. */}
        <Reveal delay={70} className="mt-[clamp(1.5rem,3vw,2.25rem)]">
          <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-soft">
            Fastest routes
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {primaryHubs.map((hub) => (
              <li
                key={hub}
                className="rounded-pill border border-navy/10 bg-lime-soft px-3 py-1.5 text-[0.8125rem] font-medium text-navy"
              >
                {hub}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Full state and union territory list, kept quiet so it informs
            without shouting. */}
        <Reveal delay={110} className="mt-[clamp(1.75rem,3.5vw,2.5rem)]">
          <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-soft">
            Every state and union territory
          </h3>
          <dl className="mt-4 grid gap-x-[clamp(1.25rem,2.5vw,2.5rem)] gap-y-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {stateCoverage.map(({ state, cities }) => (
              <div key={state} className="border-t border-line-soft pt-3">
                <dt className="text-[0.8125rem] font-semibold text-navy">
                  {state}
                </dt>
                <dd className="mt-1 text-[0.8125rem] leading-relaxed text-muted">
                  {cities.join(" · ")}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
