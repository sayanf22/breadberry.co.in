"use client";

import { useEffect } from "react";
import { CheckIcon, WhatsAppIcon } from "@/components/icons";
import { site } from "@/lib/site";
import type { FormState } from "@/app/actions";

export function SuccessPanel({
  message,
  whatsapp,
}: {
  message?: string;
  whatsapp?: string;
}) {
  /* Hand the enquiry to WhatsApp once the confirmation has had a moment to be
     read and announced. The button below is the fallback whenever this cannot
     run — blocked navigation, or no JavaScript at all. */
  useEffect(() => {
    if (!whatsapp) return;
    const timer = setTimeout(() => window.location.assign(whatsapp), 1200);
    return () => clearTimeout(timer);
  }, [whatsapp]);

  return (
    <div
      className="panel-enter rounded-panel border border-lime-soft bg-lime-mist p-[clamp(1.5rem,3vw,2.25rem)]"
      role="status"
    >
      <span className="grid size-12 place-items-center rounded-full bg-lime-soft text-navy">
        <CheckIcon className="size-6" />
      </span>
      <h2 className="mt-5 font-sans text-[1.125rem] font-semibold leading-snug text-navy">
        Request received
      </h2>
      <p className="mt-2 text-muted">{message}</p>

      {whatsapp && (
        <a
          href={whatsapp}
          className="mt-6 inline-flex min-h-11 items-center gap-2.5 rounded-pill bg-[#c3ffab] px-5 text-[0.875rem] font-semibold text-navy shadow-soft transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:shadow-card"
        >
          <WhatsAppIcon className="size-[1.15rem]" />
          Continue on WhatsApp
        </a>
      )}
      {whatsapp && (
        <p className="mt-3 text-[0.8125rem] text-muted-soft">
          Goes to {site.contact} on {site.phone}.
        </p>
      )}
    </div>
  );
}

export function ErrorSummary({ state }: { state: FormState }) {
  if (state.status !== "error" || !state.message) return null;

  return (
    <p
      role="alert"
      className="rounded-2xl border border-berry/25 bg-[#fdf2f4] px-4 py-3 text-[0.8125rem] font-medium text-berry"
    >
      {state.message}
    </p>
  );
}
