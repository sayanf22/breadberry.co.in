import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/cn";

export type Feature = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  body: string;
  tone?: "blue" | "green" | "berry";
};

const tones = {
  blue: "bg-blue-soft text-blue",
  green: "bg-lime-soft text-navy",
  berry: "bg-[#fdeef1] text-berry",
} as const;

export function FeatureCard({
  feature: { icon: Icon, title, body, tone = "blue" },
  index,
  className,
}: {
  feature: Feature;
  /** Optional ordinal, shown as a quiet rule-and-number in the footer. */
  index?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "card-surface group flex h-full flex-col p-[clamp(1.375rem,2.4vw,1.875rem)]",
        className
      )}
    >
      <span className={cn("icon-tile", tones[tone])}>
        <Icon className="size-[1.4rem]" />
      </span>

      <h3 className="mt-6 text-[1.0625rem] font-semibold leading-snug tracking-[-0.012em] text-navy">
        {title}
      </h3>

      <p className="mt-2.5 text-muted">{body}</p>

      {typeof index === "number" && (
        <div className="mt-7 flex items-center gap-3 pt-5 [border-top:1px_solid_var(--color-line-soft)]">
          <span className="text-[0.6875rem] font-medium tabular-nums tracking-[0.14em] text-muted-soft">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            aria-hidden
            className="h-px flex-1 origin-left bg-line transition-[background-color] duration-500 group-hover:bg-blue/35"
          />
        </div>
      )}
    </div>
  );
}
