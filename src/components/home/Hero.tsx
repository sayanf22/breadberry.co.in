import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { LeafIcon, SnowflakeIcon, TruckIcon } from "@/components/icons";
import { site } from "@/lib/site";

const highlights = [
  {
    icon: SnowflakeIcon,
    title: "Flash Frozen",
    note: "Locks in freshness",
    ring: "bg-blue-soft text-blue",
  },
  {
    icon: LeafIcon,
    title: "100% Natural",
    note: "No preservatives",
    ring: "bg-lime-soft text-navy",
  },
  {
    icon: TruckIcon,
    title: "Bulk Supply",
    note: "For B2B needs",
    ring: "bg-lime-soft text-navy",
  },
];

const at = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function HeroItem({
  delay,
  className,
  children,
}: {
  delay: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`hero-item ${className ?? ""}`} style={at(delay)}>
      {children}
    </div>
  );
}

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
    >
      {/* Ambient wash — pure CSS so it scales to any viewport */}
      <div aria-hidden className="hero-wash absolute inset-0 -z-20" />

      {/* Soft blue orb, echoes the artwork's cool halo on small screens */}
      <div
        aria-hidden
        className="float-slow pointer-events-none absolute -right-24 top-4 -z-10 size-[19rem] rounded-full bg-[radial-gradient(circle_at_35%_30%,rgb(203_228_248/.75),transparent_68%)] blur-[2px] sm:size-[24rem] lg:hidden"
      />

      {/* Full hero artwork, large screens — bleeds toward the viewport edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 right-0 -z-10 mx-auto hidden max-w-[106rem] lg:block"
      >
        {/* The composition is landscape, so it grows with the viewport. At `lg`
            it stays at 54% — that is the widest it can be without running under
            the headline column on a 1024px iPad in landscape. */}
        <div className="hero-art absolute inset-y-0 right-0 w-[54%] max-w-[46rem] xl:w-[56%] xl:max-w-[50rem] 2xl:w-[57%] 2xl:max-w-[56rem]">
          <Image
            src="/assets/hero-desktop-6.webp"
            alt=""
            fill
            priority
            sizes="(min-width: 1536px) 57vw, (min-width: 1280px) 56vw, (min-width: 1024px) 54vw, 1px"
            className="object-contain object-right"
          />
        </div>
      </div>

      <Container>
        <div className="pb-[clamp(2.25rem,4vw,4.5rem)] pt-[clamp(1.5rem,4.5vw,3.5rem)]">
          {/* ── Copy ─────────────────────────────────────────────────── */}
          <div className="max-w-[36rem] lg:max-w-[27rem] xl:max-w-[32rem]">
            <HeroItem delay={0}>
              <Eyebrow>{site.tagline}</Eyebrow>
            </HeroItem>

            <HeroItem delay={90} className="mt-3.5 sm:mt-5">
              {/* Explicit line breaks match the reference on both breakpoints.
                  `text-wrap: normal` keeps the browser from re-flowing them. */}
              <h1 id="hero-heading" className="text-h1 [text-wrap:normal]">
                Naturally Frozen.
                <br />
                Perfectly{" "}
                <span className="box-decoration-clone rounded-[0.2em] bg-lime-soft px-[0.12em] text-navy">
                  Delivered.
                </span>
              </h1>
            </HeroItem>

            <HeroItem delay={170} className="mt-4 sm:mt-6">
              <p className="text-lead max-w-[32ch] text-muted sm:max-w-[36ch]">
                High-quality frozen fruits and purees for restaurants, cafés
                &amp; businesses.
              </p>
            </HeroItem>

            <HeroItem delay={250} className="mt-7 sm:mt-9">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
                <ButtonLink
                  href="/request-a-quote"
                  variant="accent"
                  size="lg"
                  withArrow
                >
                  Request a Quote
                </ButtonLink>
                <ButtonLink href="/about" variant="outline" size="lg">
                  About Us
                </ButtonLink>
              </div>
            </HeroItem>
          </div>

          {/* ── Product composition, small screens ───────────────────── */}
          <div
            className="hero-art relative mt-[clamp(1.5rem,6vw,2.75rem)] lg:hidden"
            aria-hidden
          >
            <Image
              src="/assets/hero-mobile-5.webp"
              alt=""
              /* Intrinsic size of the generated asset — rebuild with
                 `node scripts/build-hero-assets.mjs` if the source changes. */
              width={768}
              height={670}
              priority
              sizes="(max-width: 1023px) 100vw, 1px"
              /* Grows with the viewport instead of stopping at 36rem, which
                 left the composition marooned in white space on an iPad in
                 portrait. Capped at the asset's own width so it never upscales
                 past its native pixels. */
              className="mx-auto w-full max-w-[34rem] sm:max-w-[40rem] md:max-w-[46rem]"
            />
          </div>

          {/* ── Trust highlights ─────────────────────────────────────── */}
          <HeroItem
            delay={340}
            className="mt-[clamp(0.75rem,3vw,2.5rem)] lg:mt-14"
          >
            <ul className="grid grid-cols-3 gap-[clamp(0.375rem,2vw,2.5rem)] lg:max-w-[28rem] xl:max-w-[31rem]">
              {highlights.map(({ icon: Icon, title, note, ring }) => (
                <li
                  key={title}
                  className="group flex flex-col items-center text-center lg:items-start lg:text-left"
                >
                  <span
                    className={`grid size-[2.75rem] place-items-center rounded-2xl transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-0.5 group-hover:scale-105 sm:size-[3.125rem] ${ring}`}
                  >
                    <Icon className="size-5 sm:size-[1.4rem]" />
                  </span>
                  <p className="mt-3 text-[0.8125rem] font-semibold text-navy sm:text-[0.9375rem]">
                    {title}
                  </p>
                  <p className="mt-1 text-[0.6875rem] text-muted sm:text-[0.8125rem]">
                    {note}
                  </p>
                </li>
              ))}
            </ul>
          </HeroItem>
        </div>
      </Container>
    </section>
  );
}
