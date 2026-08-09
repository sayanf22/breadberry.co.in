import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

/**
 * Intrinsic size of `logo-mark.webp`, so Next reserves the right box and no
 * layout shift lands when the mark loads. Rebuild the asset with
 * `node scripts/build-logo-assets.mjs` if these change.
 */
const LOGO_W = 384;
const LOGO_H = 225;

export function Logo({
  className,
  imageClassName,
  subLabel = true,
  onDark = false,
}: {
  className?: string;
  imageClassName?: string;
  /** Hide the "by Adhira Enterprises" line where the copy already says it. */
  subLabel?: boolean;
  /**
   * Set on dark surfaces. The mark is full colour with a deep purple banner,
   * which sinks into the near-black footer, so it sits on a cream plate there
   * rather than dissolving into the background.
   */
  onDark?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 flex-col items-center transition-opacity duration-300 hover:opacity-85",
        className
      )}
      aria-label={`${site.name} by ${site.company} — home`}
    >
      <span
        className={cn(
          onDark &&
            "inline-flex rounded-[1.125rem] bg-cream-soft px-3 py-2 shadow-[0_2px_14px_rgb(0_0_0/0.35)]"
        )}
      >
        <Image
          src="/assets/logo-mark.webp"
          alt={site.name}
          width={LOGO_W}
          height={LOGO_H}
          /* Header mark is above the fold on every route; the footer copy is
             not, so it defers. */
          priority={!onDark}
          loading={onDark ? "lazy" : undefined}
          sizes="(min-width: 1024px) 96px, (min-width: 640px) 88px, 76px"
          className={cn(
            "h-[2.5rem] w-auto sm:h-[2.875rem] lg:h-[3.25rem]",
            imageClassName
          )}
        />
      </span>

      {subLabel && (
        /* The parent company, spelled correctly. Visitors searching the
           alternate "Adira" spelling are covered by the entity aliases in
           structured data rather than by misspelling it here. */
        <span
          className={cn(
            "mt-1 w-full whitespace-nowrap text-center text-[0.5rem] font-semibold uppercase tracking-[0.18em] sm:text-[0.5625rem]",
            onDark ? "text-cream/60" : "text-muted-soft"
          )}
        >
          BY {site.company.toUpperCase()}
        </span>
      )}
    </Link>
  );
}
