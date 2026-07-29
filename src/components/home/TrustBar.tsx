import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { trustedBy } from "@/lib/site";

/**
 * Client wordmarks on a deep green band.
 *
 * The list is rendered twice — the duplicate is hidden from assistive tech —
 * and the track translates by exactly -50%, so the loop is seamless at any
 * viewport width. Wordmarks are set as type; swap each <span> for an <Image>
 * once vector logo files are supplied.
 */
export function TrustBar() {
  const marks = [...trustedBy, ...trustedBy];

  return (
    <section
      aria-labelledby="trusted-by"
      className="pb-[clamp(2.5rem,5vw,4rem)]"
    >
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-panel bg-forest py-[clamp(1.75rem,4vw,2.75rem)]">
          {/* Soft interior light so the flat green does not read as a slab */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(58% 90% at 50% -10%, rgb(255 255 255 / .09) 0%, transparent 70%)",
            }}
          />

          <h2
            id="trusted-by"
            className="px-[clamp(1.25rem,4vw,2.5rem)] text-center font-display text-[clamp(1.0625rem,0.95rem+0.8vw,1.5rem)] leading-snug text-cream"
          >
            Trusted by fine-dine restaurants, hotels &amp; cafés
          </h2>

          <div className="edge-fade mt-[clamp(1.25rem,3vw,2rem)] overflow-hidden">
            <ul
              className="marquee-track items-center"
              style={{ "--marquee-duration": "40s" } as React.CSSProperties}
            >
              {marks.map((brand, index) => (
                <li
                  key={`${brand.name}-${index}`}
                  aria-hidden={index >= trustedBy.length}
                  className="group flex shrink-0 flex-col items-center px-[clamp(1.5rem,4vw,3.5rem)] text-center"
                >
                  <span className="font-display text-[clamp(1.125rem,2.2vw,1.5rem)] leading-none tracking-[0.01em] text-cream/85 transition-colors duration-400 group-hover:text-cream">
                    {brand.name}
                  </span>
                  <span className="mt-2 whitespace-nowrap text-[clamp(0.5625rem,1vw,0.6875rem)] uppercase leading-tight tracking-[0.16em] text-cream/45">
                    {brand.sub}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
