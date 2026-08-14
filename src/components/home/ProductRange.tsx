import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ProductSlider } from "@/components/products/ProductSlider";
import { signatureProducts } from "@/lib/products";

/**
 * Home page shows only the Breadberry Co.-branded signature line (berries and
 * purees) — not the full 77-line catalogue, which includes unbranded fresh
 * produce and seafood that don't carry the Breadberry pack design.
 */
export function ProductRange() {
  return (
    <section
      id="range"
      aria-labelledby="range-heading"
      className="pb-[clamp(3rem,7vw,5.5rem)] pt-[clamp(0.5rem,2vw,1.5rem)]"
    >
      <Container>
        <Reveal>
          <div className="flex flex-col gap-5 border-b border-line pb-[clamp(1.25rem,2.5vw,1.75rem)] sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div>
              <Eyebrow>The Breadberry Co. signature line</Eyebrow>
              <h2 id="range-heading" className="mt-3 text-h2">
                Crafted for Every Creation
              </h2>
            </div>

            <p className="text-muted text-[0.875rem] sm:max-w-[24ch] sm:text-right">
              {signatureProducts.length} berry &amp; puree lines quoted to your volume.
            </p>
          </div>
        </Reveal>

        <div className="mt-[clamp(1.5rem,3.5vw,2.25rem)]">
          <ProductSlider products={signatureProducts} />
        </div>

        <Reveal className="mt-[clamp(1.75rem,3vw,2.5rem)] flex justify-center">
          <ButtonLink href="/products" variant="outline" size="lg" withArrow>
            View all products
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
