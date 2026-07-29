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
 * so the loop has no seam. Eighteen names at this size make a long track, hence
 * the slow duration — speed is what makes a marquee feel cluttered, not length.
 */
export function ClientStrip() {
  const track = [...clients, ...clients];

  return (
    <section
      aria-labelledby="clients-heading"
      className="relative isolate overflow-hidden rounded-[clamp(1.5rem,4vw,2.75rem)] bg-forest py-[clamp(2.75rem,6.5vw,5rem)]"
    >
      {/* Interior light so the flat green does not read as a slab of ink */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(46% 70% at 50% -8%, rgb(255 255 255 / .1) 0%, transparent 68%), radial-gradient(38% 60% at 92% 108%, rgb(78 158 90 / .18) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[82.5rem] px-[clamp(1.125rem,4vw,2.75rem)] text-center">
        <p className="text-eyebrow font-medium uppercase text-cream/55">
          {site.company} · since {site.founded}
        </p>
        <h2
          id="clients-heading"
          className="mx-auto mt-4 max-w-[30ch] font-display text-[clamp(1.5rem,1.15rem+1.6vw,2.5rem)] leading-[1.16] text-cream"
        >
          <span className="text-[1.15em] font-medium">
            {site.clientsServed} kitchens
          </span>{" "}
          served across hotels, restaurants, bakeries &amp; cafés
        </h2>
      </div>

      <div className="edge-fade mt-[clamp(2rem,4.5vw,3.5rem)] overflow-hidden">
        <ul
          className="marquee-track items-center"
          style={{ "--marquee-duration": "80s" } as CSSProperties}
        >
          {track.map((name, index) => (
            <li
              key={`${name}-${index}`}
              aria-hidden={index >= clients.length}
              className="shrink-0 px-[clamp(1.25rem,3.5vw,3rem)]"
            >
              <span className="whitespace-nowrap font-display text-[clamp(1.375rem,1.05rem+1.5vw,2.375rem)] leading-none text-cream/80 transition-colors duration-400 hover:text-cream">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
