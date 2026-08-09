"use client";

import { useRef, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/ui/Field";
import { WhatsAppIcon } from "@/components/icons";
import { enquiryLinks } from "@/lib/enquiry";
import { site } from "@/lib/site";

function valuesFrom(form: HTMLFormElement) {
  const values: Record<string, string> = {};
  for (const [key, value] of new FormData(form)) {
    if (typeof value === "string") values[key] = value;
  }
  return values;
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const links = () => {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return null;
    return enquiryLinks(`New enquiry for ${site.name}`, valuesFrom(form));
  };

  const openEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const draft = links();
    if (draft) window.location.href = draft.mailto;
  };

  const openWhatsApp = () => {
    const draft = links();
    if (draft) window.open(draft.whatsapp, "_blank", "noopener,noreferrer");
  };

  return (
    <form ref={formRef} onSubmit={openEmail} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name" required>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            className={inputClass()}
            placeholder="Aarav Mehta"
          />
        </Field>

        <Field label="Business name" htmlFor="company">
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={inputClass()}
            placeholder="Olive Bistro"
          />
        </Field>

        <Field label="Work email" htmlFor="email" required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={inputClass()}
            placeholder="chef@yourvenue.com"
          />
        </Field>

        <Field label="Phone" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass()}
            placeholder="+91 98765 43210"
          />
        </Field>
      </div>

      <Field
        label="How can we help?"
        htmlFor="message"
        required
        hint="Products, volumes, delivery city — whatever is useful."
      >
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          minLength={10}
          className={`${inputClass()} resize-y`}
          placeholder="We run three cafés in Mumbai and go through roughly 40 kg of frozen berries a month…"
        />
      </Field>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" withArrow className="w-full sm:w-auto">
          Open Email Draft
        </Button>
        <button
          type="button"
          onClick={openWhatsApp}
          className="inline-flex h-[3.25rem] w-full items-center justify-center gap-2.5 rounded-pill bg-[#25d366] px-6 text-[0.9375rem] font-semibold text-white shadow-[0_4px_16px_rgba(37,211,102,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#20bd5a] sm:w-auto"
        >
          <WhatsAppIcon className="size-5" />
          Send via WhatsApp
        </button>
      </div>
      <p className="text-[0.75rem] text-muted-soft">
        Opens your device&rsquo;s configured email or WhatsApp app. Nothing is sent until you confirm it there.
      </p>
    </form>
  );
}
