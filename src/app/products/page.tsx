import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { PortfolioGrid } from "@/components/home/CuratedSelection";
import { ProductFilter } from "@/components/products/ProductFilter";
import { QuoteCta } from "@/components/home/QuoteCta";
import { products } from "@/lib/products";
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
        eyebrow="Our curated selection"
        title="A portfolio built for professional kitchens"
        description={`${site.company} sources and supplies a meticulously curated range of premium global ingredients, giving executive chefs, pastry chefs and specialty bakers reliable access to every line they depend on.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />

      {/* Portfolio categories */}
      <section
        aria-labelledby="portfolio-heading"
        className="pt-[clamp(2.5rem,5vw,4rem)]"
      >
        <Container>
          <h2 id="portfolio-heading" className="sr-only">
            Product categories
          </h2>
          <PortfolioGrid />
        </Container>
      </section>

      {/* Breadberry Co. catalogue */}
      <section id="range" className="py-[clamp(2.5rem,6vw,4.5rem)]">
        <Container>
          <Reveal className="border-b border-line pb-[clamp(1.25rem,2.5vw,1.75rem)]">
            <Eyebrow>The Breadberry Co. signature line</Eyebrow>
            <h2 className="mt-3 max-w-[26ch] text-h2">
              Frozen berries &amp; fruit purees
            </h2>
            <p className="text-lead mt-4 max-w-[54ch] text-muted">
              {products.length} lines held under rigorous cold-chain protocols
              to preserve flavour depth, vibrant colour and nutritional
              integrity — built for high-end confectionery and designer cakes.
            </p>
          </Reveal>

          <div className="mt-[clamp(1.75rem,3.5vw,2.5rem)]">
            <Suspense
              fallback={
                <div className="h-14 w-full max-w-sm animate-pulse rounded-pill bg-surface" />
              }
            >
              <ProductFilter />
            </Suspense>
          </div>
        </Container>
      </section>

      <QuoteCta />
    </>
  );
}
