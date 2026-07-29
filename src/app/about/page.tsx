import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QuoteCta } from "@/components/home/QuoteCta";
import { VideoDialog } from "@/components/ui/VideoDialog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} supplies IQF berries and single-origin fruit purees to professional kitchens across India, with an unbroken cold chain and batch-level documentation.`,
};

const timeline = [
  {
    year: "2016",
    title: "One cold room, four chefs",
    body: "We started by supplying frozen raspberries to four pastry kitchens who could not get consistent fruit through the monsoon.",
  },
  {
    year: "2019",
    title: "Our own IQF line",
    body: "Moving freezing in-house cut the harvest-to-freeze window to under six hours and gave us control of every grade.",
  },
  {
    year: "2022",
    title: "Purees added",
    body: "Aseptic single-origin purees launched alongside the whole-fruit range, built to the specs bar teams kept asking for.",
  },
  {
    year: "Today",
    title: "Twelve cities, one standard",
    body: "A standing delivery network across twelve cities, still run on the same batch documentation we started with.",
  },
];

const values = [
  {
    title: "Fruit first",
    body: "We buy by varietal and window. If a lot does not meet grade, it does not ship — there is no second tier.",
  },
  {
    title: "Show the numbers",
    body: "Brix, pH and drained weight go on the docket. You should never have to take our word for a spec.",
  },
  {
    title: "Built around prep",
    body: "Deliveries are scheduled around your prep days. Cold chain is our problem, not something you inherit.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A fruit supplier built by people who cook"
        description="Breadberry Co. exists because professional kitchens deserve frozen fruit that behaves exactly the same in January and in July."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      >
        <VideoDialog label="Watch our story" />
      </PageHero>

      {/* Story */}
      <section aria-labelledby="story-heading" className="py-[clamp(3rem,7vw,5rem)]">
        <Container>
          <div className="grid items-center gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                eyebrow="Our story"
                eyebrowTone="green"
                title={
                  <span id="story-heading">
                    Started in a cold room in Pune
                  </span>
                }
              />
              <div className="mt-6 space-y-4 text-muted">
                <p>
                  In 2016 a pastry chef told us the same thing three suppliers
                  had told her was impossible: she needed raspberries that held
                  their shape through a bake, in August. We spent a season
                  reworking how fruit was picked, chilled and frozen until she
                  had them.
                </p>
                <p>
                  That is still the whole business. We buy fruit by varietal and
                  harvest window, freeze it individually within hours, and
                  document every batch so a kitchen can plan a menu around it
                  rather than around the weather.
                </p>
                <p>
                  Today we supply restaurants, cafés, bakeries and hotel groups
                  across twelve cities — and we still lose sleep over drained
                  weight.
                </p>
              </div>
            </Reveal>

            <Reveal
              delay={120}
              className="relative aspect-[4/3] overflow-hidden rounded-hero bg-tint-blueberry"
            >
              <Image
                src="/assets/hero-mobile.webp"
                alt="Breadberry Co. frozen berry pouches and fruit puree tubs"
                fill
                sizes="(min-width: 1024px) 44vw, 92vw"
                className="object-cover object-center"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section
        aria-labelledby="timeline-heading"
        className="pb-[clamp(3rem,7vw,5rem)]"
      >
        <Container>
          <Reveal className="rounded-panel bg-surface px-[clamp(1.125rem,3.5vw,3rem)] py-[clamp(2rem,5vw,3.5rem)]">
            <SectionHeading
              eyebrow="Milestones"
              eyebrowTone="blue"
              title={<span id="timeline-heading">How we got here</span>}
              align="center"
              className="mx-auto"
            />

            <ol className="mt-[clamp(1.75rem,3.5vw,2.75rem)] grid gap-[clamp(0.75rem,1.6vw,1.25rem)] sm:grid-cols-2 lg:grid-cols-4">
              {timeline.map((entry, index) => (
                <Reveal
                  key={entry.year}
                  as="li"
                  delay={index * 80}
                  className="card-surface group p-[clamp(1.25rem,2.4vw,1.75rem)]"
                >
                  <span className="text-eyebrow font-medium uppercase text-blue">
                    {entry.year}
                  </span>
                  <h3 className="mt-3 text-[1.0625rem] font-semibold leading-snug tracking-[-0.012em] text-navy">
                    {entry.title}
                  </h3>
                  <p className="mt-2.5 text-muted">{entry.body}</p>
                </Reveal>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      {/* Values */}
      <section aria-labelledby="values-heading" className="py-[clamp(3rem,7vw,5rem)]">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What we hold to"
              eyebrowTone="green"
              title={<span id="values-heading">Three working rules</span>}
            />
          </Reveal>

          <div className="mt-[clamp(2rem,4vw,3rem)] grid gap-5 lg:grid-cols-3">
            {values.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 80}
                className="rounded-card border-l-2 border-blue/30 bg-surface-2 p-[clamp(1.25rem,2.4vw,1.75rem)]"
              >
                <h3 className="font-display text-h3 text-navy">{item.title}</h3>
                <p className="mt-2.5 text-muted">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <QuoteCta />
    </>
  );
}
