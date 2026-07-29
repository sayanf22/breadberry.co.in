import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { PortfolioGrid } from "@/components/products/PortfolioGrid";
import { ProductFilter } from "@/components/products/ProductFilter";
import { QuoteCta } from "@/components/home/QuoteCta";
import { products } from "@/lib/products";
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
        eyebrow="The Breadberry Co. signature line"
        title="Frozen berries &amp; fruit purees"
        description={`${products.length} lines held under rigorous cold-chain protocols to preserve flavour depth, vibrant colour and nutritional integrity — built for high-end confectionery and designer cakes.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />

      {/* Breadberry Co. catalogue */}
      <section
        id="range"
        aria-label="Frozen berries and fruit purees"
        className="py-[clamp(2.5rem,6vw,4.5rem)]"
      >
        <Container>
          <Suspense
            fallback={
              <div className="h-14 w-full max-w-sm animate-pulse rounded-pill bg-surface" />
            }
          >
            <ProductFilter />
          </Suspense>
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
