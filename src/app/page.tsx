import type { Metadata } from "next";
import { Blessing } from "@/components/home/Blessing";
import { Hero } from "@/components/home/Hero";
import { ClientStrip } from "@/components/home/ClientStrip";
import { ProductRange } from "@/components/home/ProductRange";
import { Difference } from "@/components/home/Difference";
import { QuoteCta } from "@/components/home/QuoteCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} by ${site.company} — Premium Frozen Berries, Purees & Imported Ingredients Supplier, ${site.city}`,
  description: `${site.company} (also Adira Enterprises) supplies IQF frozen berries, fruit purees, fresh imported vegetables, artisanal cheese and frozen seafood to ${site.clientsServed} professional kitchens across India. Based in ${site.city}.`,
  path: "/",
  keywords: [
    "frozen berries supplier Mumbai",
    "IQF frozen berries wholesale India",
    "fruit puree supplier for bakeries",
    "imported fresh vegetables Mumbai",
    "HORECA food supplier India",
    "Adhira Enterprises Mumbai",
    "Adira Enterprises food supplier",
    "Breadberry Co",
    "premium ingredient importer India",
    "frozen food supplier for hotels restaurants",
  ],
});

export default function HomePage() {
  return (
    <>
      <Blessing />
      <Hero />
      <ClientStrip />
      <ProductRange />
      <Difference />
      <QuoteCta />

      <JsonLd
        data={breadcrumbSchema([{ name: "Home", path: "/" }])}
      />
    </>
  );
}
