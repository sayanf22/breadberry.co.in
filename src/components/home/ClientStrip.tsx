import type { CSSProperties } from "react";
import { clients, site } from "@/lib/site";

/**
 * Full-bleed client band.
 *
 * Sits outside the page container so it reaches both viewport edges, with a
 * large radius on all four corners so it reads as a slab tucked between the
 * sections above and below.
 *
 * One marquee row: the list is doubled and the track translates exactly -50%,
 * so the loop has no seam. The cycle is slow on purpose — speed is what makes
 * a marquee feel cluttered, not length. Phones get a shorter cycle so the
 * shorter visible window still turns over at a similar rate.
 */
export function ClientStrip() {
  const track = [...clients, ...clients];

  return (
    <section
      aria-labelledby="clients-heading"
      className="relative isolate overflow-hidden rounded-[clamp(1.25rem,4vw,2.75rem)] bg-lime-soft py-[clamp(2rem,6vw,4.5rem)]"
    >
      {/*
        No overlay. A white radial wash used to sit here for "depth", but at
        55% opacity it lightened the whole upper half, so the band never
        actually showed --color-leaf-200. The swatch renders flat and exact.
      */}

      <div className="mx-auto max-w-[82.5rem] px-[clamp(1.125rem,4vw,2.75rem)] text-center">
        <p className="text-[clamp(0.5625rem,0.53rem+0.16vw,0.75rem)] font-semibold uppercase leading-relaxed tracking-[0.14em] text-navy/70">
          {site.company} · since {site.founded}
        </p>
        <h2
          id="clients-heading"
          className="mx-auto mt-3 max-w-[30ch] font-display text-[clamp(1.25rem,1.02rem+1.5vw,2.5rem)] leading-[1.18] text-navy sm:mt-4"
        >
          <span className="font-medium">{site.clientsServed} kitchens</span>{" "}
          served across hotels, restaurants, bakeries &amp; cafés
        </h2>
      </div>

      <div className="edge-fade mt-[clamp(1.5rem,4.5vw,3.5rem)] overflow-hidden">
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
              className="shrink-0 px-[clamp(0.875rem,3.5vw,3rem)]"
            >
              <span className="whitespace-nowrap font-display text-[clamp(1.125rem,0.95rem+1.5vw,2.375rem)] leading-none text-navy/80">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
