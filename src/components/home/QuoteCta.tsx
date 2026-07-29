import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import {
  BeakerIcon,
  ClockIcon,
  PhoneIcon,
  SnowflakeIcon,
  TruckIcon,
} from "@/components/icons";
import { site } from "@/lib/site";

/** Capability chips — scannable proof before the ask. */
const chips = [
  { icon: SnowflakeIcon, label: "IQF berries" },
  { icon: BeakerIcon, label: "Fruit purees" },
  { icon: TruckIcon, label: "1 kg – full pallet" },
  { icon: ClockIcon, label: "Quote in 1 day" },
];

export function QuoteCta() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="pb-[clamp(3rem,7vw,5.5rem)]"
    >
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-panel bg-blue-mist px-[clamp(1.25rem,4vw,3.5rem)] py-[clamp(2.5rem,6vw,4rem)]">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(60% 70% at 50% 0%, rgb(30 127 201 / .1) 0%, transparent 68%), radial-gradient(46% 60% at 88% 100%, rgb(252 226 234 / .55) 0%, transparent 70%)",
            }}
          />

          <div className="mx-auto flex max-w-[46rem] flex-col items-center text-center">
            {/* Chip row */}
            <ul className="flex flex-wrap justify-center gap-2">
              {chips.map(({ icon: Icon, label }) => (
                <li key={label}>
                  <span className="inline-flex items-center gap-2 rounded-pill border border-navy/10 bg-white/75 px-3.5 py-2 text-[0.75rem] font-medium text-navy backdrop-blur-sm sm:text-[0.8125rem]">
                    <Icon className="size-[0.95rem] shrink-0 text-blue" />
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            <h2
              id="cta-heading"
              className="mt-[clamp(1.5rem,3vw,2rem)] max-w-[22ch] text-h2"
            >
              Get a bulk quote in one working day
            </h2>

            <p className="text-lead mt-4 max-w-[48ch] text-muted">
              Tell us your volumes and delivery city. We’ll come back with
              pricing, pack sizes and the next available dispatch slot.
            </p>

            <div className="mt-[clamp(1.75rem,3vw,2.25rem)] flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <ButtonLink
                href="/request-a-quote"
                variant="accent"
                size="lg"
                withArrow
              >
                Request a Quote
              </ButtonLink>

              <a
                href={site.phoneHref}
                className="inline-flex h-[3.25rem] items-center justify-center gap-2.5 rounded-pill border border-navy/12 bg-white/60 px-6 text-[0.9375rem] font-medium text-navy transition-[background-color,border-color] duration-300 hover:border-navy/25 hover:bg-white"
              >
                <PhoneIcon className="size-[1.05rem] text-blue" />
                {site.phone}
              </a>
            </div>

            <p className="mt-5 text-[0.75rem] text-muted-soft">
              No minimum contract on trial volumes · Samples available for first
              orders
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
