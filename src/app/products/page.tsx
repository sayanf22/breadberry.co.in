import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { ProductFilter } from "@/components/products/ProductFilter";
import { QuoteCta } from "@/components/home/QuoteCta";

export const metadata: Metadata = {
  title: "Products",
  description:
    "IQF frozen berries and single-origin fruit purees available in 1 kg to pallet quantities for restaurants, cafés, bakeries and hotel groups.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Product Range"
        title="Crafted for Every Creation"
        description="Individually quick frozen berries and unsweetened purees, graded for pastry, bar and bakery work. Every line is available in bulk with full batch documentation."
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />

      <section className="py-[clamp(2.5rem,6vw,4.5rem)]">
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

      <QuoteCta />
    </>
  );
}
