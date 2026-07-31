import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { PortfolioGrid } from "@/components/products/PortfolioGrid";
import { ProductFilter } from "@/components/products/ProductFilter";
import { QuoteCta } from "@/components/home/QuoteCta";
import { products, signatureProducts } from "@/lib/products";
import { portfolio } from "@/lib/portfolio";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Premium frozen berries and purees, fresh imported vegetables, artisanal cheeses, specialty Asian dry groceries and frozen seafood — supplied in bulk to professional kitchens.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="The Adhira catalogue"
        title="Every line we supply"
        description={`${products.length} lines across berries, purees, fresh imported produce, bakery and Japanese staples and frozen seafood — including the ${signatureProducts.length} Breadberry Co. signature berry and puree lines.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />

      {/* Full catalogue, filtered by range */}
      <section
        id="range"
        aria-label="Product catalogue"
        className="py-[clamp(2.5rem,6vw,4.5rem)]"
      >
        <Container>
          {/* No Suspense boundary: the filter no longer reads search params,
              so the whole grid is server rendered in the static HTML. */}
          <ProductFilter />
        </Container>
      </section>

      {/* Wider Adhira portfolio */}
      <section
        aria-labelledby="portfolio-heading"
        className="pb-[clamp(3rem,7vw,5rem)]"
      >
        <Container>
          <Reveal>
            <div className="flex flex-col gap-5 border-t border-line pt-[clamp(2rem,4vw,3rem)] lg:flex-row lg:items-end lg:justify-between lg:gap-12">
              <div>
                <Eyebrow>Our curated selection</Eyebrow>
                <h2
                  id="portfolio-heading"
                  className="mt-3 max-w-[26ch] text-h2"
                >
                  {portfolio.length} categories, one standard
                </h2>
              </div>
              <p className="text-muted lg:max-w-[34ch] lg:text-right">
                {site.company} also supplies these lines to the same
                specification, on the same delivery network.
              </p>
            </div>
          </Reveal>

          <div className="mt-[clamp(1.5rem,3.5vw,2.25rem)]">
            <PortfolioGrid />
          </div>
        </Container>
      </section>

      <QuoteCta />
    </>
  );
}
