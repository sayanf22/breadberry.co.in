import { Hero } from "@/components/home/Hero";
import { ClientStrip } from "@/components/home/ClientStrip";
import { CuratedSelection } from "@/components/home/CuratedSelection";
import { ProductRange } from "@/components/home/ProductRange";
import { Difference } from "@/components/home/Difference";
import { QuoteCta } from "@/components/home/QuoteCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientStrip />
      <CuratedSelection />
      <ProductRange />
      <Difference />
      <QuoteCta />
    </>
  );
}
