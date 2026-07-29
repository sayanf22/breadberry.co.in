"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import { ProductCard } from "@/components/products/ProductCard";
import { categories, products, type ProductCategory } from "@/lib/products";

type TabId = "all" | ProductCategory;

function isTabId(value: string | null): value is TabId {
  return !!value && categories.some((category) => category.id === value);
}

export function ProductFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // The URL is the single source of truth, so back/forward just works.
  const fromUrl = searchParams.get("category");
  const active: TabId = isTabId(fromUrl) ? fromUrl : "all";

  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const listRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const measure = useCallback(() => {
    const el = tabRefs.current[active];
    const list = listRef.current;
    if (!el || !list) return;
    setIndicator({
      left: el.offsetLeft - list.scrollLeft,
      width: el.offsetWidth,
    });
  }, [active]);

  useLayoutEffect(measure, [measure]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    window.addEventListener("resize", measure);
    list.addEventListener("scroll", measure, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      list.removeEventListener("scroll", measure);
    };
  }, [measure]);

  const select = (id: TabId) => {
    router.replace(id === "all" ? "/products" : `/products?category=${id}`, {
      scroll: false,
    });
  };

  // Roving arrow-key navigation between tabs.
  const onKeyDown = (event: KeyboardEvent) => {
    const order = categories.map((category) => category.id);
    const index = order.indexOf(active);
    let next = index;

    if (event.key === "ArrowRight") next = (index + 1) % order.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + order.length) % order.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = order.length - 1;
    else return;

    event.preventDefault();
    const id = order[next];
    select(id);
    tabRefs.current[id]?.focus();
  };

  const visible =
    active === "all"
      ? products
      : products.filter((product) => product.category === active);

  return (
    <>
      <div
        ref={listRef}
        role="tablist"
        aria-label="Filter products by range"
        onKeyDown={onKeyDown}
        className="no-scrollbar relative -mx-1 flex w-full max-w-full gap-1 overflow-x-auto rounded-pill border border-line-soft bg-surface p-1.5 sm:mx-0 sm:w-auto sm:self-start"
      >
        {/* Sliding indicator */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-1.5 top-1.5 left-0 rounded-pill bg-white shadow-soft transition-[transform,width] duration-500 ease-[var(--ease-out-soft)]"
          style={{
            width: `${indicator.width}px`,
            transform: `translateX(${indicator.left}px)`,
            opacity: indicator.width ? 1 : 0,
          }}
        />

        {categories.map((category) => {
          const selected = category.id === active;
          const count =
            category.id === "all"
              ? products.length
              : products.filter((p) => p.category === category.id).length;

          return (
            <button
              key={category.id}
              ref={(node) => {
                tabRefs.current[category.id] = node;
              }}
              type="button"
              role="tab"
              id={`tab-${category.id}`}
              aria-selected={selected}
              aria-controls="product-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => select(category.id)}
              className={cn(
                "relative z-10 shrink-0 whitespace-nowrap rounded-pill px-4 py-2.5 text-[0.8125rem] font-medium transition-colors duration-400 sm:px-5",
                selected ? "text-navy" : "text-muted hover:text-navy"
              )}
            >
              {category.label}
              <span
                className={cn(
                  "ml-1.5 text-[0.6875rem] transition-colors duration-400",
                  selected ? "text-blue" : "text-muted-soft"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="product-panel"
        aria-labelledby={`tab-${active}`}
        className="mt-[clamp(1.75rem,3.5vw,2.5rem)]"
      >
        <div
          key={active}
          className="panel-enter grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {visible.map((product, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              priority={index < 4}
              sizes="(min-width: 1280px) 19rem, (min-width: 1024px) 26vw, (min-width: 640px) 45vw, 90vw"
            />
          ))}
        </div>

        <p className="mt-8 text-[0.8125rem] text-muted-soft" aria-live="polite">
          Showing {visible.length} of {products.length} products
        </p>
      </div>
    </>
  );
}
