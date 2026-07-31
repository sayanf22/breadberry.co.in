"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";
import { ArrowRightIcon } from "@/components/icons";
import { signatureProducts } from "@/lib/products";

export function ProductRange() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

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

            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <p className="text-muted text-[0.875rem] sm:max-w-[24ch] sm:text-right">
                {signatureProducts.length} berry &amp; puree lines quoted to your volume.
              </p>

              {/* Slider Arrow Navigation Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleScroll("left")}
                  aria-label="Previous products"
                  className="grid size-10 place-items-center rounded-full border border-line bg-white text-navy shadow-soft transition-all duration-300 hover:-translate-y-px hover:border-lime-soft hover:bg-lime-mist hover:text-navy hover:shadow-card active:translate-y-px"
                >
                  <ArrowRightIcon className="size-4 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => handleScroll("right")}
                  aria-label="Next products"
                  className="grid size-10 place-items-center rounded-full border border-line bg-white text-navy shadow-soft transition-all duration-300 hover:-translate-y-px hover:border-lime-soft hover:bg-lime-mist hover:text-navy hover:shadow-card active:translate-y-px"
                >
                  <ArrowRightIcon className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Scrollable Product Carousel Strip */}
        <div
          ref={scrollRef}
          className="mt-[clamp(1.5rem,3.5vw,2.25rem)] flex overflow-x-auto no-scrollbar scroll-smooth gap-4 sm:gap-5 pb-4 pt-1"
        >
          {signatureProducts.map((product, index) => (
            <div
              key={product.slug}
              className="w-[15.5rem] sm:w-[17.5rem] lg:w-[18.5rem] shrink-0 h-full"
            >
              <ProductCard product={product} priority={index < 2} />
            </div>
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
