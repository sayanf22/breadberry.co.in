"use client";

import { useActionState } from "react";
import { initialFormState, submitQuote } from "@/app/actions";
import { Button } from "@/components/ui/Button";
import { Field, inputClass, selectArrow, selectClass } from "@/components/ui/Field";
import { ErrorSummary, SuccessPanel } from "@/components/forms/FormStatus";
import { CheckIcon } from "@/components/icons";
import { products } from "@/lib/products";

const volumes = [
  "Under 25 kg / month",
  "25 – 100 kg / month",
  "100 – 500 kg / month",
  "500 kg+ / month",
];

const frequencies = ["One-off trial", "Monthly", "Fortnightly", "Weekly"];

export function QuoteForm() {
  const [state, action, pending] = useActionState(submitQuote, initialFormState);

  if (state.status === "success") {
    return <SuccessPanel message={state.message} />;
  }

  const value = (key: string) => state.values?.[key] ?? "";
  const error = (key: string) => state.errors?.[key];
  const aria = (key: string) =>
    error(key)
      ? ({ "aria-invalid": true, "aria-describedby": `${key}-error` } as const)
      : {};
  const selected = (state.values?.products ?? "")
    .split(", ")
    .filter(Boolean);

  return (
    <form action={action} noValidate className="flex flex-col gap-6">
      <ErrorSummary state={state} />

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 text-eyebrow font-semibold uppercase text-blue">
          Your details
        </legend>

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

        <Field
          label="Business name"
          htmlFor="company"
          required
          error={error("company")}
        >
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            required
            defaultValue={value("company")}
            className={inputClass(error("company"))}
            placeholder="Olive Bistro"
            {...aria("company")}
          />
        </Field>

        <Field label="Your role" htmlFor="role">
          <input
            id="role"
            name="role"
            type="text"
            autoComplete="organization-title"
            defaultValue={value("role")}
            className={inputClass()}
            placeholder="Executive Pastry Chef"
          />
        </Field>

        <Field label="Delivery city" htmlFor="city" required error={error("city")}>
          <input
            id="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            required
            defaultValue={value("city")}
            className={inputClass(error("city"))}
            placeholder="Mumbai"
            {...aria("city")}
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

        <Field label="Phone" htmlFor="phone" required error={error("phone")}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            defaultValue={value("phone")}
            className={inputClass(error("phone"))}
            placeholder="+91 98765 43210"
            {...aria("phone")}
          />
        </Field>
      </fieldset>

      <fieldset>
        <legend className="mb-4 text-eyebrow font-semibold uppercase text-blue">
          Products required
        </legend>

        <div className="grid gap-2.5 sm:grid-cols-2">
          {products.map((product) => (
            /*
             * The checked state is driven by `checked:` on the input itself and
             * `peer-checked:` on the tick — both plain sibling selectors, so the
             * control still reads correctly without :has() support. The label
             * tint is the only part that uses :has(), as a nice-to-have.
             */
            <label
              key={product.slug}
              className="flex cursor-pointer items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 transition-[border-color,background-color] duration-300 hover:border-green-deep/45 has-[:checked]:border-green-deep/60 has-[:checked]:bg-[#eef6f0]"
            >
              <span className="relative grid size-5 shrink-0 place-items-center">
                <input
                  type="checkbox"
                  name="products"
                  value={product.name}
                  defaultChecked={selected.includes(product.name)}
                  className="peer absolute inset-0 cursor-pointer appearance-none rounded-md border border-line bg-white transition-colors duration-300 checked:border-green-deep checked:bg-green-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-deep"
                />
                <CheckIcon className="pointer-events-none relative size-3 text-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100" />
              </span>
              <span className="text-[0.875rem] text-ink">{product.name}</span>
            </label>
          ))}
        </div>

        {error("products") && (
          <p
            id="products-error"
            role="alert"
            className="mt-3 text-[0.75rem] font-medium text-berry"
          >
            {error("products")}
          </p>
        )}
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 text-eyebrow font-semibold uppercase text-blue">
          Volumes
        </legend>

        <Field
          label="Approximate monthly volume"
          htmlFor="volume"
          required
          error={error("volume")}
        >
          <select
            id="volume"
            name="volume"
            required
            defaultValue={value("volume")}
            style={selectArrow}
            className={selectClass(error("volume"))}
            {...aria("volume")}
          >
            <option value="">Select a range</option>
            {volumes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Delivery frequency" htmlFor="frequency">
          <select
            id="frequency"
            name="frequency"
            defaultValue={value("frequency")}
            style={selectArrow}
            className={selectClass()}
          >
            <option value="">Select a frequency</option>
            {frequencies.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </fieldset>

      <Field
        label="Anything else we should know?"
        htmlFor="notes"
        hint="Pack sizes, storage constraints, start date."
      >
        <textarea
          id="notes"
          name="notes"
          rows={4}
          defaultValue={value("notes")}
          className={`${inputClass()} resize-y`}
          placeholder="We'd like 10 kg cases and a standing Tuesday delivery."
        />
      </Field>

      <Button
        type="submit"
        size="lg"
        withArrow
        disabled={pending}
        className="self-start"
      >
        {pending ? "Sending…" : "Send quote request"}
      </Button>

      <p className="text-[0.75rem] text-muted-soft">
        We use your details only to prepare this quote. No marketing lists.
      </p>
    </form>
  );
}
