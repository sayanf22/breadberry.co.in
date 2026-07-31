import type { CSSProperties } from "react";
import { clients, site } from "@/lib/site";

/**
 * Full-bleed client band.
 *
 * Spaced generously with responsive padding so it feels substantial on desktop
 * while keeping the heading text scaled down on mobile phones for optimal readability.
 */
export function ClientStrip() {
  const track = [...clients, ...clients];

  return (
    <section
      aria-labelledby="clients-heading"
      className="relative isolate overflow-hidden rounded-[clamp(1.5rem,4vw,3rem)] bg-lime-soft py-[clamp(3.5rem,8vw,6.5rem)]"
    >
      <div className="mx-auto max-w-[82.5rem] px-[clamp(1.25rem,4vw,3rem)] text-center">
        {/* Eyebrow */}
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-navy/75 sm:text-[0.8125rem]">
          {site.company} · SINCE {site.founded}
        </p>

        {/* Heading — scaled smaller on mobile phone screens (< 640px) */}
        <h2
          id="clients-heading"
          className="mx-auto mt-2.5 max-w-[34ch] font-display text-[0.9375rem] font-normal leading-[1.3] text-navy sm:mt-4 sm:text-[1.5rem] sm:leading-[1.2] lg:text-[2.25rem]"
        >
          <span className="font-medium text-navy">{site.clientsServed} kitchens</span>{" "}
          served across hotels, restaurants, bakeries &amp; cafés
        </h2>
      </div>

      {/* Marquee row with generous top spacing */}
      <div className="edge-fade mt-[clamp(2rem,5vw,4rem)] overflow-hidden">
        <ul
          className="marquee-track items-center"
          style={
            {
              "--marquee-duration": "80s",
              "--marquee-duration-sm": "46s",
            } as CSSProperties
          }
        >
          {track.map((name, index) => (
            <li
              key={`${name}-${index}`}
              aria-hidden={index >= clients.length}
              className="shrink-0 px-[clamp(1rem,4vw,3.5rem)]"
            >
              <span className="whitespace-nowrap font-display text-[1.0625rem] leading-none text-navy/80 sm:text-[1.625rem] lg:text-[2.25rem]">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
