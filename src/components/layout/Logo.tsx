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
        "inline-flex shrink-0 items-center transition-opacity duration-300 hover:opacity-85",
        className
      )}
      aria-label={`${site.name} — home`}
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
    </Link>
  );
}
