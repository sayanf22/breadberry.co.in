import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

export function Logo({
  className,
  imageClassName,
}: {
  className?: string;
  imageClassName?: string;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 flex-col items-start transition-opacity duration-300 hover:opacity-85",
        className
      )}
      aria-label={`${site.name} by ${site.company} — home`}
    >
      <Image
        src="/assets/logo-mark.webp"
        alt={site.name}
        width={481}
        height={276}
        priority
        sizes="(min-width: 1024px) 132px, 104px"
        className={cn(
          "h-[2.5rem] w-auto sm:h-[2.75rem] lg:h-[3rem]",
          imageClassName
        )}
      />
      {/* "by Adira" sub-label: uses the alternate spelling intentionally so
          visitors who search "Adira Enterprises" recognise the brand. */}
      <span className="mt-0.5 text-[0.5625rem] font-medium uppercase tracking-[0.15em] text-muted-soft sm:text-[0.625rem]">
        by Adhira Enterprises
      </span>
    </Link>
  );
}
