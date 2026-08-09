import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { PortfolioGrid } from "@/components/products/PortfolioGrid";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilter } from "@/components/products/ProductFilter";
import { QuoteCta } from "@/components/home/QuoteCta";
import { products, signatureProducts, highlightedProducts } from "@/lib/products";
import { portfolio } from "@/lib/portfolio";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, itemListSchema, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `Products — ${products.length} Bulk Frozen & Fresh Lines for Kitchens`,
  description: `Buy IQF frozen berries, fruit purees, imported fresh vegetables, bakery and Japanese staples and frozen seafood in bulk. ${products.length} trade lines supplied by ${site.company} from ${site.city} across India.`,
  path: "/products",
  keywords: [
    "buy frozen berries in bulk India",
    "IQF strawberry supplier Mumbai",
    "fruit puree wholesale India",
    "imported vegetables wholesale Mumbai",
    "frozen seafood wholesale India",
    "gyoza sheets fillo pastry supplier",
    "HORECA frozen food price list",
  ],
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="The Adhira catalogue"
        title="Every line we supply"
        description={`${products.length} lines across berries, purees, fresh imported produce, bakery and Japanese staples and frozen seafood — including the ${signatureProducts.length} Breadberry Co. signature berry and puree lines.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />

      {/* Breadberry lines buyers ask for most — kept above the full catalogue
          so Lotusroot and both Edamame formats are visible immediately. */}
      <section
        aria-labelledby="breadberry-highlights-heading"
        className="pt-[clamp(2.5rem,6vw,4.5rem)]"
      >
        <Container>
          <Reveal className="rounded-panel bg-lime-panel px-[clamp(1rem,3vw,2rem)] py-[clamp(1.5rem,4vw,2.75rem)]">
            <div className="flex flex-col gap-3 border-b border-navy/10 pb-[clamp(1rem,2vw,1.5rem)] sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Eyebrow>Breadberry highlights</Eyebrow>
                <h2
                  id="breadberry-highlights-heading"
                  className="mt-2 max-w-[24ch] text-h2"
                >
                  Lotusroot &amp; Edamame favourites
                </h2>
              </div>
              <p className="max-w-[38ch] text-[0.875rem] text-muted sm:text-right">
                Four chef-ready lines for consistent prep, garnish and service.
              </p>
            </div>

            <div className="mt-[clamp(1rem,2.5vw,1.75rem)] grid grid-cols-2 gap-[clamp(0.75rem,1.6vw,1.25rem)] lg:grid-cols-4">
              {highlightedProducts.map((product, index) => (
                <Reveal key={product.slug} delay={index * 70} className="h-full">
                  <ProductCard
                    product={product}
                    priority={index < 2}
                    sizes="(min-width: 1024px) 20vw, 46vw"
                  />
                </Reveal>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Full catalogue, filtered by range */}
      <section
        id="range"
        aria-label="Product catalogue"
        className="scroll-mt-[5.5rem] sm:scroll-mt-[6.5rem] lg:scroll-mt-[7.5rem] py-[clamp(2.5rem,6vw,4.5rem)]"
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

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
          ]),
          itemListSchema(products),
        ]}
      />
    </>
  );
}
