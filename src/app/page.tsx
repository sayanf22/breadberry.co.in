import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { ProductRange } from "@/components/home/ProductRange";
import { Testimonials } from "@/components/home/Testimonials";
import { QuoteCta } from "@/components/home/QuoteCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ProductRange />
      <Testimonials />
      <QuoteCta />
    </>
  );
}
