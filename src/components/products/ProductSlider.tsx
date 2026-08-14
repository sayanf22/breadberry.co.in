"use client";

import { useEffect, useRef, useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { ArrowRightIcon } from "@/components/icons";
import type { Product } from "@/lib/products";

/**
 * Horizontally scrollable product strip with arrow controls, auto-slide, and
 * shuffled order. Advances every 3 seconds with smooth 200px glides; pauses
 * when the user hovers or touches; loops when it reaches the end.
 */
export function ProductSlider({ products: items }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /*
   * Renders in the supplied order first — identical on server and client — so
   * hydration has nothing to disagree on. `Math.random()` in a `useState`
   * initializer still runs during the server render AND the client's first
   * render, and those two calls produce different orders, which is exactly
   * what triggered the "server rendered text didn't match the client" error.
   * The shuffle is applied only after mount, inside an effect, which never
   * runs during SSR and therefore can't create a mismatch.
   */
  const [shuffled, setShuffled] = useState(items);

  useEffect(() => {
    /* Deferred past the current commit so the shuffle never fires synchronously
       inside the effect body — same pattern used in ProductFilter for the
       same reason (avoids cascading renders during the commit that mounts
       this component). */
    const timer = setTimeout(() => {
      const copy = [...items];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      setShuffled(copy);
    }, 0);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- shuffle once on mount; `items` is the initial list and re-running on every reference change would reshuffle mid-session.
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    /* If we've reached the end going right, loop back to the start. */
    if (direction === "right") {
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }
    }

    /* Scroll one card width (~200px) for a slow, smooth glide rather than
       jumping 340px which felt abrupt. */
    el.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  /* Auto-slide every 3 seconds — slow enough to read the current card. */
  useEffect(() => {
    const start = () => {
      if (intervalRef.current) return;
      intervalRef.current = setInterval(() => scroll("right"), 3000);
    };
    const stop = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    start();

    const el = scrollRef.current;
    if (el) {
      el.addEventListener("mouseenter", stop);
      el.addEventListener("mouseleave", start);
      el.addEventListener("touchstart", stop, { passive: true });
      el.addEventListener("touchend", start);
    }

    /* Pause when the tab is hidden so it doesn't pile up offscreen scrolls. */
    const onVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
      if (el) {
        el.removeEventListener("mouseenter", stop);
        el.removeEventListener("mouseleave", start);
        el.removeEventListener("touchstart", stop);
        el.removeEventListener("touchend", start);
      }
    };
  }, []);

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
        {shuffled.map((product, index) => (
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
