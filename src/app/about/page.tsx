import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QuoteCta } from "@/components/home/QuoteCta";
import { MissionVision } from "@/components/about/MissionVision";
import { VideoDialog } from "@/components/ui/VideoDialog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Founded in ${site.founded} by ${site.founder}, ${site.company} bridges world-class culinary ingredients and Mumbai's elite gastronomic landscape. Breadberry Co. is its signature brand.`,
};

const timeline = [
  {
    year: site.founded,
    title: "Founded in Mumbai",
    body: `${site.founder} establishes ${site.company} with a singular vision: to bridge the gap between world-class culinary ingredients and Mumbai's elite gastronomic landscape.`,
  },
  {
    year: "Growth",
    title: "A trusted procurement partner",
    body: "From a Mumbai base, the business grows into a procurement partner for 5-star hotels, fine-dining restaurants, premium confectioneries and artisanal bakers.",
  },
  {
    year: "Expansion",
    title: "Breadberry Co. introduced",
    body: "As our footprint in the premium food sector widens, Breadberry Co. launches as a signature brand under the Adhira Enterprises umbrella.",
  },
  {
    year: "Today",
    title: `${site.clientsServed} kitchens served`,
    body: "Five curated ingredient categories, supplied to over a thousand kitchens, cake studios, cafés and retail brands.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`Welcome to ${site.company}`}
        title="Elevating culinary experiences through exceptional ingredients"
        description={`Founded in ${site.founded} by ${site.founder}, we bring the world's finest flavours directly to Mumbai's most demanding kitchens.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      >
        <VideoDialog label="Watch our story" />
      </PageHero>

      {/* Story */}
      <section
        aria-labelledby="story-heading"
        className="py-[clamp(3rem,7vw,5rem)]"
      >
        <Container>
          <div className="grid items-center gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                eyebrow="Our story"
                title={<span id="story-heading">Built on a single vision</span>}
              />
              <div className="mt-6 space-y-4 text-muted">
                <p>
                  {site.company} was established in {site.founded} by{" "}
                  {site.founder} with a singular vision: to bridge the gap
                  between world-class culinary ingredients and Mumbai&rsquo;s
                  elite gastronomic landscape. We understand that exceptional
                  creations begin with uncompromising ingredients.
                </p>
                <p>
                  From our base in Mumbai, we have grown into a trusted
                  procurement partner for 5-star hotels, fine-dining
                  restaurants, premium confectioneries and artisanal bakers —
                  dedicated to bringing the world&rsquo;s finest flavours
                  directly to your kitchen.
                </p>
                <p>
                  As our footprint in the premium food sector expanded, we
                  proudly introduced Breadberry Co. as a signature brand under
                  the {site.company} umbrella. Through Breadberry Co. we extend
                  our passion for quality and craftsmanship into specialised
                  culinary and baking avenues, continuing our tradition of
                  excellence.
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
                  key={entry.title}
                  as="li"
                  delay={index * 80}
                  className="card-surface group p-[clamp(1.25rem,2.4vw,1.75rem)]"
                >
                  <span className="text-eyebrow font-medium uppercase text-green-deep">
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

      <MissionVision />

      <QuoteCta />
    </>
  );
}
