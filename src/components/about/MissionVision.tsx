import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  GlobeIcon,
  ShieldCheckIcon,
  SnowflakeIcon,
  SparkleIcon,
  TruckIcon,
  UsersIcon,
} from "@/components/icons";
import { site } from "@/lib/site";

const pillars = [
  {
    icon: GlobeIcon,
    label: "Our vision",
    body: "To bridge the gap between world-class culinary ingredients and Mumbai's elite gastronomic landscape.",
  },
  {
    icon: ShieldCheckIcon,
    label: "Our strength",
    body: "A conviction that exceptional creations begin with uncompromising ingredients — and nothing else.",
  },
  {
    icon: UsersIcon,
    label: "Who we serve",
    body: "5-star hotels, fine-dining restaurants, premium confectioneries and artisanal bakers.",
  },
  {
    icon: SnowflakeIcon,
    label: "Cold chain",
    body: "Delicate temperature control held end to end, so frozen fruit arrives exactly as intended.",
  },
  {
    icon: TruckIcon,
    label: "Supply",
    body: `From our ${site.city} base, on a delivery schedule built around your prep days rather than our routes.`,
  },
  {
    icon: SparkleIcon,
    label: "Our brand",
    body: `${site.name} extends our craftsmanship into specialised culinary and baking avenues.`,
  },
];

/**
 * Deliberately card-free: a rule-framed heading and a plain icon-and-text
 * grid. Keeps the page from becoming another wall of panels.
 */
export function MissionVision() {
  return (
    <section
      aria-labelledby="mission-heading"
      className="py-[clamp(3rem,7vw,5rem)]"
    >
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <span aria-hidden className="h-px w-14 bg-lime-soft" />
          <h2
            id="mission-heading"
            className="my-5 text-[clamp(1.375rem,1.1rem+1.1vw,2rem)] uppercase tracking-[0.06em] text-navy"
          >
            Our mission &amp; vision
          </h2>
          <span aria-hidden className="h-px w-14 bg-lime-soft" />
        </Reveal>

        <ul className="mt-[clamp(2.25rem,5vw,3.5rem)] grid gap-x-[clamp(1.5rem,4vw,3.5rem)] gap-y-[clamp(2rem,4vw,3rem)] sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map(({ icon: Icon, label, body }, index) => (
            <Reveal
              key={label}
              as="li"
              delay={index * 70}
              className="flex flex-col items-center text-center"
            >
              <Icon
                className="size-10 rounded-full bg-lime-soft p-2 text-navy"
                strokeWidth={1.4}
              />
              <h3 className="mt-4 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-navy">
                {label}
              </h3>
              <p className="mt-3 max-w-[34ch] text-[0.9375rem] leading-relaxed text-muted">
                {body}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
