"use client";

import { useRef } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { ArrowRightIcon } from "@/components/icons";
import type { Product } from "@/lib/products";

/**
 * Horizontally scrollable product strip with arrow controls. Same pattern as
 * the homepage `ProductRange` slider, generalised to take any product list so
 * it can be reused wherever a full range needs to be browsable without
 * lengthening the page with a long grid.
 */
export function ProductSlider({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -340 : 340,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scroll("left")}
          aria-label="Previous products"
          className="grid size-10 place-items-center rounded-full border border-line bg-white text-navy shadow-soft transition-all duration-300 hover:-translate-y-px hover:border-lime-soft hover:bg-lime-mist hover:shadow-card active:translate-y-px"
        >
          <ArrowRightIcon className="size-4 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => scroll("right")}
          aria-label="Next products"
          className="grid size-10 place-items-center rounded-full border border-line bg-white text-navy shadow-soft transition-all duration-300 hover:-translate-y-px hover:border-lime-soft hover:bg-lime-mist hover:shadow-card active:translate-y-px"
        >
          <ArrowRightIcon className="size-4" />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="mt-3 flex snap-x snap-mandatory gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2 pt-1 sm:gap-5"
      >
        {products.map((product, index) => (
          <div
            key={product.slug}
            className="h-full w-[15.5rem] shrink-0 snap-start sm:w-[17.5rem] lg:w-[18.5rem]"
          >
            <ProductCard product={product} priority={index < 2} />
          </div>
        ))}
      </div>
    </div>
  );
}
