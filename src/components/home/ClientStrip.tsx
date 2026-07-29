import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { clientsRowOne, clientsRowTwo, site } from "@/lib/site";

function Row({
  names,
  duration,
  reversed = false,
}: {
  names: readonly string[];
  duration: string;
  reversed?: boolean;
}) {
  /** Doubled so a -50% translate loops without a seam. */
  const track = [...names, ...names];

  return (
    <ul
      className={cn("marquee-track items-center", reversed && "is-reversed")}
      style={{ "--marquee-duration": duration } as CSSProperties}
    >
      {track.map((name, index) => (
        <li
          key={`${name}-${index}`}
          aria-hidden={index >= names.length}
          className="shrink-0 px-[clamp(1.25rem,3.5vw,3rem)]"
        >
          <span className="whitespace-nowrap font-display text-[clamp(1.375rem,1.05rem+1.5vw,2.375rem)] leading-none text-cream/80 transition-colors duration-400 hover:text-cream">
            {name}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Full-bleed client band.
 *
 * Sits outside the page container so it reaches both viewport edges, with a
 * large radius on all four corners so it reads as a slab tucked between the
 * sections above and below.
 */
export function ClientStrip() {
  return (
    <section
      aria-labelledby="clients-heading"
      className="relative isolate overflow-hidden rounded-[clamp(1.5rem,4vw,2.75rem)] bg-forest py-[clamp(2.5rem,6vw,4.5rem)]"
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

      <div className="edge-fade mt-[clamp(1.75rem,4vw,3rem)] space-y-[clamp(0.75rem,2vw,1.5rem)] overflow-hidden">
        <Row names={clientsRowOne} duration="52s" />
        <Row names={clientsRowTwo} duration="58s" reversed />
      </div>
    </section>
  );
}
