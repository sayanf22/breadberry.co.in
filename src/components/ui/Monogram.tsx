import { cn } from "@/lib/cn";
import type { MonogramTone } from "@/lib/testimonials";

const tones = {
  blue: "bg-blue-soft text-blue",
  green: "bg-[#e7f3ea] text-green",
  berry: "bg-[#fbe6eb] text-berry",
  amber: "bg-[#fbf1d9] text-[#a4761c]",
} as const;

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

/**
 * Initials stand in for a headshot. Attributing stock photography to a named
 * customer would be fabricated social proof, so monograms until real portraits
 * are supplied.
 */
export function Monogram({
  name,
  tone = "blue",
  onDark = false,
  className,
}: {
  name: string;
  tone?: MonogramTone;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-full font-semibold tracking-[0.02em]",
        onDark ? "bg-cream/12 text-cream" : tones[tone],
        className
      )}
    >
      {initials(name)}
    </span>
  );
}
