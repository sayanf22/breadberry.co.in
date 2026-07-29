import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whyUsFeatures } from "@/lib/features";
import { QuoteCta } from "@/components/home/QuoteCta";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Why Us",
  description:
    "An unbroken −18 °C cold chain, batch-level testing and bulk-ready supply — the reasons professional kitchens standardise on Breadberry Co.",
};

const stats = [
  { value: "−18 °C", label: "Held end to end, field to walk-in" },
  { value: "< 6 h", label: "From harvest to blast freezing" },
  { value: "1 day", label: "Typical quote turnaround" },
  { value: "12", label: "Cities on a standing delivery route" },
];

const steps = [
  {
    title: "Sourced at peak",
    body: "We buy by varietal and window, not by the year — fruit is picked at full colour and moved straight to the freezing line.",
  },
  {
    title: "Frozen individually",
    body: "IQF tunnels freeze each berry separately, so you portion exactly what you need without a frozen block or bruised fruit.",
  },
  {
    title: "Tested per batch",
    body: "Brix, pH, drained weight and microbiology are recorded per lot, and the certificate travels with the consignment.",
  },
  {
    title: "Delivered cold",
    body: "Insulated vehicles with temperature loggers, scheduled around your prep days rather than our routes.",
  },
];

export default function WhyUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Breadberry"
        title="Consistency you can build a menu on"
        description="Frozen fruit only earns its place in a professional kitchen when every case behaves the same way. That predictability is the whole product."
        crumbs={[{ label: "Home", href: "/" }, { label: "Why Us" }]}
      >
        <ButtonLink href="/request-a-quote" variant="accent" size="lg" withArrow>
          Request a Quote
        </ButtonLink>
      </PageHero>

      {/* Stats */}
      <section aria-label="Key figures" className="pt-[clamp(2.5rem,5vw,4rem)]">
        <Container>
          <Reveal className="rounded-panel bg-surface px-[clamp(1.25rem,3.5vw,3rem)] py-[clamp(1.75rem,3.5vw,2.5rem)]">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Reveal key={stat.value} delay={index * 70}>
                  <dt className="font-display text-[clamp(1.75rem,1.2rem+2vw,2.5rem)] leading-none text-navy">
                    {stat.value}
                  </dt>
                  <dd className="mt-2.5 max-w-[22ch] text-[0.8125rem] text-muted">
                    {stat.label}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* Differentiators */}
      <section
        aria-labelledby="pillars-heading"
        className="py-[clamp(3rem,7vw,5rem)]"
      >
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What sets us apart"
              eyebrowTone="blue"
              title={<span id="pillars-heading">Four things we never flex on</span>}
              align="center"
            />
          </Reveal>

          <div className="mt-[clamp(2rem,4vw,3rem)] grid gap-[clamp(0.75rem,1.6vw,1.25rem)] sm:grid-cols-2 lg:grid-cols-4">
            {whyUsFeatures.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 80} className="h-full">
                <FeatureCard feature={feature} index={index} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section
        aria-labelledby="process-heading"
        className="pb-[clamp(3rem,7vw,5rem)]"
      >
        <Container>
          <Reveal className="rounded-panel bg-surface px-[clamp(1.125rem,3.5vw,3rem)] py-[clamp(2rem,5vw,3.5rem)]">
            <SectionHeading
              eyebrow="Our process"
              eyebrowTone="green"
              title={<span id="process-heading">From field to walk-in</span>}
              description="Four stages, each with a checkpoint you can audit."
            />

            <ol className="mt-[clamp(1.75rem,3.5vw,2.75rem)] grid gap-[clamp(0.75rem,1.6vw,1.25rem)] sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <Reveal
                  key={step.title}
                  as="li"
                  delay={index * 80}
                  className="card-surface group p-[clamp(1.25rem,2.4vw,1.75rem)]"
                >
                  <span className="text-[0.6875rem] font-medium tabular-nums tracking-[0.14em] text-blue">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[1.0625rem] font-semibold leading-snug tracking-[-0.012em] text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-muted">{step.body}</p>
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
