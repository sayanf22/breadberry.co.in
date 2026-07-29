"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { CloseIcon, PlayIcon } from "@/components/icons";

/**
 * "Watch Our Story" trigger + lightweight modal.
 * The iframe is only mounted while open, so nothing is fetched until asked.
 */
export function VideoDialog({
  label = "Watch Our Story",
  src = "https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ?autoplay=1&rel=0",
  tone = "dark",
}: {
  label?: string;
  src?: string;
  tone?: "dark" | "light";
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const previous = body.style.overflow;
    body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const timer = window.setTimeout(() => closeRef.current?.focus(), 60);

    return () => {
      body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(timer);
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group inline-flex items-center gap-3 rounded-pill py-1.5 pr-2 text-[0.875rem] font-medium transition-colors duration-300",
          tone === "dark"
            ? "text-navy hover:text-blue"
            : "text-white hover:text-white/80"
        )}
      >
        <span
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-full border transition-[transform,border-color,box-shadow,background-color] duration-400 ease-[var(--ease-out-soft)] group-hover:scale-105",
            tone === "dark"
              ? "border-line bg-white text-blue shadow-soft group-hover:border-blue/40"
              : "border-white/35 text-white group-hover:border-white/70"
          )}
        >
          <PlayIcon className="size-[0.95rem] translate-x-px" />
        </span>
        {label}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={label}
          className="fixed inset-0 z-200 grid place-items-center bg-navy-deep/80 p-4 backdrop-blur-sm"
          style={{ animation: "bb-fade .3s var(--ease-out-soft) both" }}
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div
            className="panel-enter w-full max-w-[62rem] overflow-hidden rounded-panel bg-black shadow-lift"
            style={{ aspectRatio: "16 / 9" }}
          >
            <iframe
              src={src}
              title={label}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="size-full border-0"
            />
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={() => {
              setOpen(false);
              triggerRef.current?.focus();
            }}
            aria-label="Close video"
            className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/12 text-white transition-colors duration-300 hover:bg-white/25 sm:right-7 sm:top-7"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>
      )}
    </>
  );
}
