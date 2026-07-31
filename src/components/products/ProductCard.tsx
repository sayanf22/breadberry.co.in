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
    <article
      className={cn(
        "card-surface group h-full [--card-glow:#c3ffab2e] [--card-ring-mid:#c3ffab80] [--card-ring:#c3ffab]",
        className
      )}
    >
      <Link
        href={`/products/${product.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-[inherit]"
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
            className="object-cover object-center transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.05] group-focus-within:scale-[1.05]"
          />

          {/* Cold chain reads as the one hard fact a buyer scans for. A pill
              rather than a circle so "Chilled" never clips at 2-up. */}
          <span className="absolute right-2 top-2 z-2 rounded-pill border border-navy/10 bg-white/90 px-2 py-0.5 text-[0.5625rem] font-semibold uppercase tracking-[0.1em] text-navy shadow-soft backdrop-blur-sm sm:right-2.5 sm:top-2.5 sm:text-[0.625rem]">
            {product.chain}
          </span>
        </div>

        {/* The accent line draws in for pointer and keyboard interaction. */}
        <span
          aria-hidden
          className="relative block h-px w-full bg-line-soft"
        >
          <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#c3ffab] via-[#c3ffab] to-transparent transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-x-100 group-focus-within:scale-x-100" />
        </span>

        {/* ── Meta ──────────────────────────────────────────────────── */}
        <div className="flex flex-1 flex-col items-center px-[clamp(0.75rem,1.5vw,1.25rem)] py-[clamp(0.8125rem,1.5vw,1.125rem)] text-center">
          {/* Wraps rather than truncates: at 2-up on a phone the card is
              ~160px wide and most names would otherwise be clipped. */}
          <h3 className="text-[0.875rem] font-semibold leading-snug tracking-[-0.01em] text-navy sm:text-[0.9375rem]">
            {product.name}
          </h3>
          {/* The supply format, not the range: the range is already carried by
              the section heading, the selected tab and the card tint. */}
          <p className="mt-1 text-[0.6875rem] leading-snug text-muted sm:text-[0.75rem]">
            {product.form}
          </p>
        </div>

        {/* Full-width action bar, the catalogue equivalent of an add-to-cart
            row: one obvious target that fills with the brand green. */}
        <span className="flex items-center justify-center gap-1.5 border-t border-line-soft px-3 py-[0.6875rem] text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-navy transition-colors duration-500 ease-[var(--ease-out-soft)] group-hover:bg-[#c3ffab] group-focus-within:bg-[#c3ffab] sm:text-[0.6875rem]">
          View product
          <ArrowRightIcon
            aria-hidden
            className="size-3.5 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:translate-x-1 group-focus-within:translate-x-1"
          />
        </span>
      </Link>
    </article>
  );
}
