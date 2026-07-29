import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  tone = "green",
  className,
}: {
  children: ReactNode;
  /** Green uses a lime marker with readable navy ink on light surfaces. */
  tone?: "green" | "blue" | "mint" | "light";
  className?: string;
}) {
  const tones = {
    green:
      "inline-flex items-center gap-2 text-navy before:size-2 before:shrink-0 before:rounded-full before:bg-lime-soft",
    blue: "text-blue",
    /** Exact accent remains highly visible against the near-black slab. */
    mint: "text-lime-soft",
    light: "text-white/65",
  } as const;

  return (
    <p
      className={cn(
        "text-eyebrow font-medium uppercase",
        tones[tone],
        className
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  eyebrowTone = "green",
  title,
  description,
  align = "left",
  className,
  children,
}: {
  eyebrow?: string;
  eyebrowTone?: "green" | "blue" | "mint" | "light";
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        centered && "items-center text-center",
        className
      )}
    >
      {eyebrow && <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>}
      <h2 className="text-h2 max-w-[24ch]">{title}</h2>
      {description && (
        <p
          className={cn(
            "text-lead max-w-[48ch] text-muted",
            centered && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
