import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QuoteCta } from "@/components/home/QuoteCta";
import { MissionVision } from "@/components/about/MissionVision";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `About ${site.name} by ${site.company} — Our Founder & Story`,
  description: `${site.name} is the signature food-service brand of ${site.company}, founded in ${site.city} by ${site.founder}. Meet the team supplying premium ingredients to 5-star hotels, fine-dining restaurants and cafés.`,
  path: "/about",
  keywords: [
    site.name,
    site.company,
    "Adira Enterprises",
    "Breadberry by Adhira Enterprises",
    "Adhira Enterprises Mumbai",
    site.founder,
    "premium food importer India",
  ],
});

const timeline = [
  {
    year: site.founded,
    title: `${site.company} founded`,
    body: `${site.founder} establishes the Mumbai business to connect professional kitchens with dependable, globally sourced ingredients.`,
  },
  {
    year: "Growth",
    title: "Trusted by hospitality teams",
    body: "The business grows into a procurement partner for 5-star hotel groups, fine-dining restaurants, cafés, confectioneries and artisanal bakers.",
  },
  {
    year: "Breadberry",
    title: `${site.name} takes shape`,
    body: `${site.name} becomes the signature brand of ${site.company}, focused on premium frozen berries, fruit purees and specialist culinary lines.`,
  },
  {
    year: "Today",
    title: `${site.clientsServed} kitchens served`,
    body: "A curated catalogue now serves professional kitchens with careful sourcing, cold-chain handling and responsive trade support.",
  },
];

export default function AboutPage() {
  const heroStats = [
    { value: site.clientsServed, label: "Kitchens served" },
    { value: "5-star", label: "Hotels & fine-dine restaurants" },
    { value: "77+", label: "Product lines" },
    { value: site.founded, label: "Est. Mumbai" },
  ];

  return (
    <>
      <PageHero
        eyebrow={`${site.name} by ${site.company}`}
        title="The story behind Breadberry Co."
        description={`${site.name} is the signature brand of ${site.company}, founded in ${site.city} by ${site.founder} to bring dependable premium ingredients to professional kitchens.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      >
        {/* Quick-read facts strip instead of a video */}
        <dl className="mt-2 flex flex-wrap gap-x-8 gap-y-3">
          {heroStats.map(({ value, label }) => (
            <div key={label}>
              <dt className="text-[0.6875rem] font-medium uppercase tracking-[0.13em] text-muted-soft">
                {label}
              </dt>
              <dd className="mt-0.5 font-display text-[1.375rem] font-semibold leading-none text-navy">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* Story */}
      <section
        aria-labelledby="story-heading"
        className="py-[clamp(3rem,7vw,5rem)]"
      >
        <Container>
          <div className="max-w-[52rem]">
            <Reveal>
              <SectionHeading
                eyebrow="Breadberry & Adhira"
                title={<span id="story-heading">One company, one signature brand</span>}
              />
              <div className="mt-6 space-y-4 text-muted">
                <p>
                  <strong className="font-semibold text-navy">{site.company}</strong>{" "}
                  is the parent company founded in {site.city} in {site.founded}{" "}
                  by {site.founder}. It was created to help professional kitchens
                  source premium ingredients with dependable quality, careful
                  handling and responsive service.
                </p>
                <p>
                  <strong className="font-semibold text-navy">{site.name}</strong>{" "}
                  is the company&rsquo;s signature brand. Breadberry brings together
                  frozen berries, fruit purees and specialist culinary lines for
                  pastry teams, chefs and food-service buyers. You may therefore
                  see the business described as &ldquo;Breadberry by {site.company}.&rdquo;
                </p>
                <p>
                  Today we supply 5-star hotel groups, fine-dining restaurants,
                  cafés, premium confectioneries and artisanal bakers. Every
                  range is selected for practical kitchen performance and moved
                  with the storage and cold-chain care that the product requires.
                </p>
              </div>
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
                  <span className="inline-flex rounded-full bg-lime-soft px-2.5 py-1 text-eyebrow font-medium uppercase text-navy">
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

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />
    </>
  );
}
