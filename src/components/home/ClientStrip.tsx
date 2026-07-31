import type { CSSProperties } from "react";
import { clients, site } from "@/lib/site";
import { clientLogoMap } from "@/components/illustrations/clientLogos";

/**
 * Full-bleed client band with unified single-color vector brand logos.
 *
 * All client logos are rendered in a single, high-end monochrome color (text-navy/80)
 * for a cohesive, executive brand trust strip across both desktop and mobile viewports.
 */
export function ClientStrip() {
  const track = [...clients, ...clients];

  return (
    <section
      aria-labelledby="clients-heading"
      className="relative isolate overflow-hidden rounded-[clamp(1.5rem,4vw,3rem)] bg-lime-soft py-[clamp(4.5rem,10vw,8rem)]"
    >
      <div className="mx-auto max-w-[82.5rem] px-[clamp(1.25rem,4vw,3rem)] text-center">
        {/* Eyebrow */}
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-navy/75 sm:text-[0.8125rem]">
          {site.company} · SINCE {site.founded}
        </p>

        {/* Heading — strictly one-liner on mobile phone screens */}
        <h2
          id="clients-heading"
          className="mx-auto mt-2.5 max-w-full whitespace-nowrap font-display text-[clamp(0.5625rem,2.7vw,0.875rem)] font-normal leading-none text-navy sm:mt-4 sm:max-w-[34ch] sm:whitespace-normal sm:text-[1.5rem] sm:leading-[1.2] lg:text-[2.25rem]"
        >
          <span className="font-medium text-navy">{site.clientsServed} kitchens</span>{" "}
          served across hotels, restaurants, bakeries &amp; cafés
        </h2>
      </div>

      {/* Marquee row rendering single-color vector logos */}
      <div className="edge-fade mt-[clamp(3.5rem,8vw,6rem)] overflow-hidden">
        <ul
          className="marquee-track items-center"
          style={
            {
              "--marquee-duration": "80s",
              "--marquee-duration-sm": "46s",
            } as CSSProperties
          }
        >
          {track.map((name, index) => {
            const LogoComponent = clientLogoMap[name];
            return (
              <li
                key={`${name}-${index}`}
                aria-hidden={index >= clients.length}
                className="flex shrink-0 items-center px-[clamp(1.5rem,4.5vw,4.5rem)] text-navy/85 transition-opacity duration-300 hover:opacity-100"
              >
                {LogoComponent ? (
                  <LogoComponent className="h-[2.25rem] sm:h-[3.25rem] lg:h-[3.875rem] w-auto text-navy/90" />
                ) : (
                  <span className="whitespace-nowrap font-display text-[1.25rem] leading-none text-navy/85 sm:text-[2rem] lg:text-[2.625rem]">
                    {name}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
