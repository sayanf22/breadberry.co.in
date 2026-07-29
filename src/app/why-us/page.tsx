import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { QuoteCta } from "@/components/home/QuoteCta";
import { differenceFeatures } from "@/lib/features";
import { portfolio } from "@/lib/portfolio";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Why Us",
  description: `${site.company} supplies Mumbai's finest kitchens and cake studios. Rigorous cold-chain control, verified provenance and uncompromising hygiene on every consignment.`,
};

const stats = [
  { value: site.clientsServed, label: "Kitchens served since 2020" },
  { value: String(portfolio.length), label: "Curated ingredient categories" },
  { value: "5-star", label: "Hotels, restaurants & cake studios supplied" },
  { value: site.city, label: "Base of operations and delivery network" },
];

const commitments = [
  {
    title: "Temperature, held",
    body: "Frozen fruit purees need delicate, unbroken temperature control. That requirement shapes how we store, load and deliver — not the other way round.",
  },
  {
    title: "Labels, verified",
    body: "Specialty gourmet products are only worth what their provenance can prove. We authenticate the labels we carry before they reach your kitchen.",
  },
  {
    title: "Handling, respected",
    body: "Supplying fine kitchens takes more than logistics. It demands a deep respect for meticulous food handling standards at every touchpoint.",
  },
  {
    title: "Range, developed",
    body: "Through Breadberry Co. we keep extending into specialised culinary and baking avenues, so your menu is never limited by what we stock.",
  },
];

export default function WhyUsPage() {
  return (
    <>
      <PageHero
        eyebrow={`The ${site.company.split(" ")[0]} difference`}
        title="Consistency, quality, hygiene — in that order, every time"
        description="In competitive food service and specialty baking, trust is built on consistency and uncompromising standards. Our operations exist to protect the integrity of every single product we carry."
        crumbs={[{ label: "Home", href: "/" }, { label: "Why Us" }]}
      >
        <ButtonLink href="/request-a-quote" variant="accent" size="lg" withArrow>
          Request a Quote
        </ButtonLink>
      </PageHero>

      {/* Figures */}
      <section aria-label="Key figures" className="pt-[clamp(2.5rem,5vw,4rem)]">
        <Container>
          <Reveal className="rounded-panel bg-surface px-[clamp(1.25rem,3.5vw,3rem)] py-[clamp(1.75rem,3.5vw,2.5rem)]">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Reveal key={stat.label} delay={index * 70}>
                  <dt className="font-display text-[clamp(1.625rem,1.2rem+1.8vw,2.375rem)] leading-none text-green-deep">
                    {stat.value}
                  </dt>
                  <dd className="mt-2.5 max-w-[24ch] text-[0.8125rem] text-muted">
                    {stat.label}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* Commitments */}
      <section
        aria-labelledby="pillars-heading"
        className="py-[clamp(3rem,7vw,5rem)]"
      >
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What we never flex on"
              title={
                <span id="pillars-heading">
                  Four commitments behind every delivery
                </span>
              }
              align="center"
            />
          </Reveal>

          <div className="mt-[clamp(2rem,4vw,3rem)] grid gap-[clamp(0.75rem,1.6vw,1.25rem)] sm:grid-cols-2 lg:grid-cols-4">
            {differenceFeatures.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 80} className="h-full">
                <FeatureCard feature={feature} index={index} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* How that plays out */}
      <section
        aria-labelledby="detail-heading"
        className="pb-[clamp(3rem,7vw,5rem)]"
      >
        <Container>
          <Reveal className="rounded-panel bg-surface px-[clamp(1.125rem,3.5vw,3rem)] py-[clamp(2rem,5vw,3.5rem)]">
            <SectionHeading
              eyebrow="In practice"
              eyebrowTone="blue"
              title={
                <span id="detail-heading">
                  What protecting product integrity actually means
                </span>
              }
              description="Four operating habits that decide whether an ingredient arrives as intended."
            />

            <ol className="mt-[clamp(1.75rem,3.5vw,2.75rem)] grid gap-[clamp(0.75rem,1.6vw,1.25rem)] sm:grid-cols-2 lg:grid-cols-4">
              {commitments.map((item, index) => (
                <Reveal
                  key={item.title}
                  as="li"
                  delay={index * 80}
                  className="card-surface group p-[clamp(1.25rem,2.4vw,1.75rem)]"
                >
                  <span className="text-[0.6875rem] font-medium tabular-nums tracking-[0.14em] text-green-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[1.0625rem] font-semibold leading-snug tracking-[-0.012em] text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-muted">{item.body}</p>
                </Reveal>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      <QuoteCta />
    </>
  );
}
