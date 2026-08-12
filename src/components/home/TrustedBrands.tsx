import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

/**
 * Supplied brand grid, shown as one artwork rather than individual logos.
 *
 * The client provided the full client list as a single composed sheet
 * (`design`/`images/brand.png`), so it is served as one optimised image. That
 * keeps every mark exactly as licensed and avoids re-drawing 90+ logos by hand.
 */
export function TrustedBrands({
  eyebrow = "Trusted by brands",
  title = "The kitchens that source from us",
  description,
  className,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <section
      aria-labelledby="trusted-brands-heading"
      className={className ?? "py-[clamp(2.5rem,6vw,4.5rem)]"}
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            title={<span id="trusted-brands-heading">{title}</span>}
            description={
              description ??
              `${site.clientsServed} hotel groups, fine-dining restaurants, cafés, bakeries and retail brands supplied by ${site.company}.`
            }
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <Reveal delay={110} className="mt-[clamp(1.75rem,4vw,3rem)]">
          <Image
            src="/assets/client-brands.webp"
            alt={`Hotel, restaurant, café and retail brands supplied by ${site.company}`}
            width={1600}
            height={738}
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="mx-auto h-auto w-full max-w-[75rem]"
          />
        </Reveal>
      </Container>
    </section>
  );
}
