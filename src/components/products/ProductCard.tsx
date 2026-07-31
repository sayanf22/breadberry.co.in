import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { ArrowRightIcon } from "@/components/icons";
import type { Product } from "@/lib/products";

export function ProductCard({
  product,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 22rem, 46vw",
}: {
  product: Product;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <article className={cn("card-surface group h-full", className)}>
      <Link
        href={`/products/${product.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-[inherit] outline-none"
      >
        {/* ── Pack shot ─────────────────────────────────────────────── */}
        <div
          className={cn(
            "relative aspect-[196/232] overflow-hidden",
            product.tint
          )}
        >
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover object-center transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.05]"
          />
        </div>

        {/* Divider that warms to the brand gradient on hover */}
        <span
          aria-hidden
          className="relative block h-px w-full bg-line-soft"
        >
          <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-blue via-blue-mid to-transparent transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-x-100" />
        </span>

        {/* ── Meta ──────────────────────────────────────────────────── */}
        <div className="flex flex-1 items-center justify-between gap-2.5 px-[clamp(0.75rem,1.5vw,1.25rem)] py-[clamp(0.8125rem,1.5vw,1.125rem)] sm:gap-3">
          <div className="min-w-0">
            {/* Wraps rather than truncates: at 2-up on a phone the card is
                ~160px wide and most names would have been clipped. */}
            <h3 className="text-[0.875rem] font-semibold leading-snug tracking-[-0.01em] text-navy sm:text-[0.9375rem]">
              {product.name}
            </h3>
            <p className="mt-1 text-[0.6875rem] text-muted sm:text-[0.75rem]">
              {product.categoryLabel}
            </p>
          </div>

          <span
            aria-hidden
            className="relative grid size-8 shrink-0 place-items-center overflow-hidden rounded-full border border-line text-navy transition-[border-color,color] duration-500 ease-[var(--ease-out-soft)] group-hover:border-navy group-hover:text-white sm:size-9"
          >
            <span className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-navy transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-y-100" />
            <ArrowRightIcon className="relative z-2 size-4 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}
