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
            alt={`${product.name} — ${product.categoryLabel} pack`}
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
        <div className="flex flex-1 items-center justify-between gap-3 px-[clamp(0.875rem,1.5vw,1.25rem)] py-[clamp(0.875rem,1.5vw,1.125rem)]">
          <div className="min-w-0">
            <h3 className="truncate text-[0.9375rem] font-semibold tracking-[-0.01em] text-navy">
              {product.name}
            </h3>
            <p className="mt-1 truncate text-[0.75rem] text-muted">
              {product.categoryLabel}
            </p>
          </div>

          <span
            aria-hidden
            className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-full border border-line text-navy transition-[border-color,color] duration-500 ease-[var(--ease-out-soft)] group-hover:border-navy group-hover:text-white"
          >
            <span className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-navy transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-y-100" />
            <ArrowRightIcon className="relative z-2 size-4 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}
