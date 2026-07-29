import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";
import { featuredProducts, products } from "@/lib/products";

/**
 * Featured range. A fixed grid rather than a scroller: at every breakpoint the
 * row divides evenly, so no card is ever cut in half at the container edge.
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

            <p className="text-muted sm:max-w-[28ch] sm:text-right">
              {products.length} berry and puree lines, from 1&nbsp;kg tubs to
              full pallet quantities.
            </p>
          </div>
        </Reveal>

        <div className="mt-[clamp(1.5rem,3.5vw,2.25rem)] grid grid-cols-2 gap-[clamp(0.75rem,1.6vw,1.25rem)] lg:grid-cols-4">
          {featuredProducts.map((product, index) => (
            <Reveal key={product.slug} delay={index * 70} className="h-full">
              <ProductCard product={product} priority={index < 2} />
            </Reveal>
          ))}
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
