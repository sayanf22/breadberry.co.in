import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowRightIcon } from "@/components/icons";

type Variant = "primary" | "accent" | "outline" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy text-white shadow-btn hover:bg-navy-deep hover:shadow-[0_14px_30px_-12px_rgb(11_44_79/0.65)]",
  /** Reserved for the "Request a Quote" conversion path. */
  accent:
    "bg-green-deep text-white shadow-[0_10px_24px_-12px_rgb(20_120_90/0.7)] hover:bg-green-deeper hover:shadow-[0_14px_30px_-12px_rgb(20_120_90/0.75)]",
  outline:
    "border border-line bg-white text-navy hover:border-green-deep/45 hover:text-green-deep hover:shadow-soft",
  ghost: "text-navy hover:text-green-deep",
  light:
    "bg-white text-navy shadow-soft hover:shadow-card hover:-translate-y-px",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.8125rem] gap-1.5",
  md: "h-12 px-5 text-[0.875rem] gap-2 sm:px-6",
  lg: "h-[3.25rem] px-6 text-[0.9375rem] gap-2.5 sm:px-7",
};

const shared =
  "group/btn relative inline-flex shrink-0 items-center justify-center overflow-hidden " +
  "whitespace-nowrap rounded-pill font-medium leading-none " +
  "transition-[background-color,color,box-shadow,transform,border-color] duration-300 " +
  "ease-[var(--ease-out-soft)] active:translate-y-px disabled:pointer-events-none disabled:opacity-55";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  children: ReactNode;
  className?: string;
};

function Inner({
  children,
  withArrow,
}: {
  children: ReactNode;
  withArrow?: boolean;
}) {
  return (
    <>
      {/* Light sweep on hover — sits behind the label */}
      <span aria-hidden className="sheen" />
      <span className="relative z-2">{children}</span>
      {withArrow && (
        <ArrowRightIcon className="relative z-2 size-[1.05em] shrink-0 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover/btn:translate-x-1" />
      )}
    </>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  withArrow,
  className,
  children,
  ...rest
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={cn(shared, variants[variant], sizes[size], className)}
      {...rest}
    >
      <Inner withArrow={withArrow}>{children}</Inner>
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  withArrow,
  className,
  children,
  href,
  ...rest
}: CommonProps & ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      href={href}
      className={cn(shared, variants[variant], sizes[size], className)}
      {...rest}
    >
      <Inner withArrow={withArrow}>{children}</Inner>
    </Link>
  );
}
