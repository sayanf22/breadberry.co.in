import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";
import { CheckIcon, ChevronRightIcon } from "@/components/icons";
import { products, relatedProducts } from "@/lib/products";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  canonical,
  pageMetadata,
  productSchema,
} from "@/lib/seo";
import { site } from "@/lib/site";
import Link from "next/link";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return { title: "Product not found" };

  /* Long-tail intent: buyers search the line plus a commercial qualifier and a
     place, so the title carries the range, the city and the trade context. */
  return {
    ...pageMetadata({
      title: `${product.name} — Bulk ${product.categoryLabel} Supplier, ${site.city}`,
      description: `${product.blurb} Supplied in trade packs by ${site.company}, ${site.city}, with delivery across India. ${product.specs[1].value}.`,
      path: `/products/${product.slug}`,
      keywords: [
        `${product.name} supplier`,
        `${product.name} wholesale price India`,
        `buy ${product.name} in bulk ${site.city}`,
        `${product.categoryLabel} supplier India`,
      ],
    }),
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${product.name} · ${site.name}`,
      description: product.blurb,
      url: canonical(`/products/${product.slug}`),
      images: [{ url: product.image, alt: product.imageAlt }],
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  /* Storage and handling differ per category — fresh produce must never
     inherit the frozen −18 °C line. */
  const handling = product.handling;
  const related = relatedProducts(product);

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-line-soft">
        <div aria-hidden className="hero-wash absolute inset-0 -z-10" />

        <Container>
          <div className="pb-[clamp(2.5rem,6vw,4rem)] pt-[clamp(1.75rem,4vw,3rem)]">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-1.5 text-[0.75rem] text-muted">
                {[
                  { label: "Home", href: "/" },
                  { label: "Products", href: "/products" },
                ].map((crumb, index) => (
                  <li key={crumb.href} className="flex items-center gap-1.5">
                    {index > 0 && (
                      <ChevronRightIcon
                        className="size-3 text-muted-soft"
                        aria-hidden
                      />
                    )}
                    <Link
                      href={crumb.href}
                      className="transition-colors duration-300 hover:text-blue"
                    >
                      {crumb.label}
                    </Link>
                  </li>
                ))}
                <li className="flex items-center gap-1.5">
                  <ChevronRightIcon
                    className="size-3 text-muted-soft"
                    aria-hidden
                  />
                  <span aria-current="page" className="text-navy">
                    {product.name}
                  </span>
                </li>
              </ol>
            </nav>

            <div className="grid items-center gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-2">
              <div
                className={`hero-art relative order-first aspect-[196/262] max-h-[32rem] w-full overflow-hidden rounded-hero lg:order-last ${product.tint}`}
              >
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, 92vw"
                  className="object-cover"
                />
              </div>

              <div>
                <Eyebrow>{product.categoryLabel}</Eyebrow>
                <h1 className="mt-4 text-h1">{product.name}</h1>
                <p className="text-lead mt-5 max-w-[46ch] text-muted">
                  {product.blurb}
                </p>

                <dl className="mt-8 grid max-w-md grid-cols-3 gap-3">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="rounded-card border border-line-soft bg-white/70 px-4 py-3.5 backdrop-blur-sm"
                    >
                      <dt className="text-[0.6875rem] uppercase tracking-[0.12em] text-muted-soft">
                        {spec.label}
                      </dt>
                      <dd className="mt-1.5 text-[0.875rem] font-medium text-navy">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-8 space-y-2.5">
                  {handling.map((line) => (
                    <li key={line} className="flex gap-3 text-muted">
                      <CheckIcon className="mt-0.5 size-5 shrink-0 rounded-full bg-lime-soft p-1 text-navy" />
                      {line}
                    </li>
                  ))}
                </ul>

                <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <ButtonLink
                    href={`/request-a-quote?products=${encodeURIComponent(product.name)}#quote-form`}
                    variant="accent"
                    size="lg"
                    withArrow
                  >
                    Request a Quote
                  </ButtonLink>
                  <ButtonLink href="/contact" variant="outline" size="lg">
                    Talk to sales
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="related-heading"
        className="py-[clamp(3rem,7vw,5rem)]"
      >
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="More from the range"
              title={<span id="related-heading">You may also need</span>}
            />
          </Reveal>

          <div className="mt-[clamp(1.75rem,3.5vw,2.5rem)] grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 70}>
                <ProductCard product={item} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <JsonLd
        data={[
          productSchema(product),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: product.name, path: `/products/${product.slug}` },
          ]),
        ]}
      />
    </>
  );
}
