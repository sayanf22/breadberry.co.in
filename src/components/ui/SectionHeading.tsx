import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  tone = "green",
  className,
}: {
  children: ReactNode;
  /** Green is the house accent; blue is reserved for cold-chain context. */
  tone?: "green" | "blue" | "light";
  className?: string;
}) {
  const tones = {
    green: "text-green-deep",
    blue: "text-blue",
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
  eyebrowTone?: "green" | "blue" | "light";
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
