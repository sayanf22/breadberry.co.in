"use client";

import { useActionState } from "react";
import { initialFormState, submitContact } from "@/app/actions";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/ui/Field";
import { ErrorSummary, SuccessPanel } from "@/components/forms/FormStatus";

export function ContactForm() {
  const [state, action, pending] = useActionState(
    submitContact,
    initialFormState
  );

  if (state.status === "success") {
    return <SuccessPanel message={state.message} />;
  }

  const value = (key: string) => state.values?.[key] ?? "";
  const error = (key: string) => state.errors?.[key];
  const aria = (key: string) =>
    error(key)
      ? ({ "aria-invalid": true, "aria-describedby": `${key}-error` } as const)
      : {};

  return (
    <form action={action} noValidate className="flex flex-col gap-5">
      <ErrorSummary state={state} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name" required error={error("name")}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            defaultValue={value("name")}
            className={inputClass(error("name"))}
            placeholder="Aarav Mehta"
            {...aria("name")}
          />
        </Field>

        <Field label="Business name" htmlFor="company">
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            defaultValue={value("company")}
            className={inputClass()}
            placeholder="Olive Bistro"
          />
        </Field>

        <Field label="Work email" htmlFor="email" required error={error("email")}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={value("email")}
            className={inputClass(error("email"))}
            placeholder="chef@yourvenue.com"
            {...aria("email")}
          />
        </Field>

        <Field label="Phone" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={value("phone")}
            className={inputClass()}
            placeholder="+91 98765 43210"
          />
        </Field>
      </div>

      <Field
        label="How can we help?"
        htmlFor="message"
        required
        error={error("message")}
        hint="Products, volumes, delivery city — whatever is useful."
      >
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={value("message")}
          className={`${inputClass(error("message"))} resize-y`}
          placeholder="We run three cafés in Mumbai and go through roughly 40 kg of frozen berries a month…"
          {...aria("message")}
        />
      </Field>

      <Button
        type="submit"
        size="lg"
        withArrow
        disabled={pending}
        className="self-start"
      >
        {pending ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  );
}
