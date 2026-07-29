import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Page gutter + max width. Fluid padding keeps the same optical margin
 * from 320px through ultra-wide.
 */
export function Container({
  as: Tag = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[82.5rem] px-[clamp(1.125rem,4vw,2.75rem)]",
        className
      )}
    >
      {children}
    </Tag>
  );
}
