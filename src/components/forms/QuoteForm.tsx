"use client";

import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { submitQuote, type FormState } from "@/app/actions";
import { Button } from "@/components/ui/Button";
import { Field, inputClass, selectArrow, selectClass } from "@/components/ui/Field";
import { ErrorSummary, SuccessPanel } from "@/components/forms/FormStatus";
import { CheckIcon, WhatsAppIcon } from "@/components/icons";
import { categories, products } from "@/lib/products";
import { site } from "@/lib/site";

const initialFormState: FormState = { status: "idle" };

const volumes = [
  "Under 25 kg / month",
  "25 – 100 kg / month",
  "100 – 500 kg / month",
  "500 kg+ / month",
];

const frequencies = ["One-off trial", "Monthly", "Fortnightly", "Weekly"];

export function QuoteForm() {
  const [state, action, pending] = useActionState(submitQuote, initialFormState);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [volume, setVolume] = useState("");
  const [frequency, setFrequency] = useState("");
  const [notes, setNotes] = useState("");

  // Parse URL query parameter ?products= on client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const queryProducts = params.get("products");
      if (queryProducts) {
        const items = queryProducts
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
        setSelectedProducts((prev) => Array.from(new Set([...prev, ...items])));
      }
    }
  }, []);

  // Sync initial server action errors / values if any
  useEffect(() => {
    if (state.values?.products) {
      const serverSelected = state.values.products.split(", ").filter(Boolean);
      setSelectedProducts((prev) => Array.from(new Set([...prev, ...serverSelected])));
    }
    if (state.values?.name) setName(state.values.name);
    if (state.values?.company) setCompany(state.values.company);
    if (state.values?.city) setCity(state.values.city);
    if (state.values?.phone) setPhone(state.values.phone);
    if (state.values?.volume) setVolume(state.values.volume);
    if (state.values?.notes) setNotes(state.values.notes);
  }, [state]);

  if (state.status === "success") {
    return <SuccessPanel message={state.message} whatsapp={state.whatsapp} />;
  }

  const error = (key: string) => state.errors?.[key];
  const aria = (key: string) =>
    error(key)
      ? ({ "aria-invalid": true, "aria-describedby": `${key}-error` } as const)
      : {};

  const toggleProduct = (productName: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productName)
        ? prev.filter((item) => item !== productName)
        : [...prev, productName]
    );
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      activeCategory === "all" || p.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Send Enquiry directly to WhatsApp with pre-formatted product list
  const handleWhatsAppEnquiry = () => {
    const productList =
      selectedProducts.length > 0
        ? selectedProducts.map((p) => `• ${p}`).join("\n")
        : "• Wholesale Enquiry (General)";

    const messageLines = [
      `Hello ${site.company},`,
      ``,
      `I would like to request a wholesale bulk quote for the following products:`,
      ``,
      `📦 REQUIRED PRODUCTS:`,
      productList,
      ``,
      `📋 CONTACT DETAILS:`,
      name ? `• Name: ${name}` : null,
      company ? `• Business: ${company}` : null,
      role ? `• Role: ${role}` : null,
      city ? `• Delivery City: ${city}` : null,
      phone ? `• Phone: ${phone}` : null,
      volume ? `• Volume: ${volume}` : null,
      frequency ? `• Frequency: ${frequency}` : null,
      notes ? `\n📝 NOTES:\n${notes}` : null,
    ]
      .filter((line) => line !== null)
      .join("\n");

    const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(messageLines)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <form action={action} noValidate className="flex flex-col gap-6">
      <ErrorSummary state={state} />

      {/* Hidden input to ensure state-managed selected products submit with form action */}
      <input type="hidden" name="products" value={selectedProducts.join(", ")} />

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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={company}
            onChange={(e) => setCompany(e.target.value)}
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
            value={role}
            onChange={(e) => setRole(e.target.value)}
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
            value={city}
            onChange={(e) => setCity(e.target.value)}
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass(error("phone"))}
            placeholder="+91 98765 43210"
            {...aria("phone")}
          />
        </Field>
      </fieldset>

      <fieldset className="rounded-panel border border-line-soft bg-surface/50 p-4 sm:p-5">
        <legend className="mb-3 text-eyebrow font-semibold uppercase text-blue flex items-center justify-between w-full">
          <span>Products required ({selectedProducts.length})</span>
        </legend>

        {/* Selected Products Chips Bar */}
        {selectedProducts.length > 0 ? (
          <div className="mb-4 flex flex-wrap gap-2 rounded-2xl bg-white p-3 border border-lime-soft shadow-soft">
            {selectedProducts.map((pName, idx) => {
              const matchedProduct = products.find((item) => item.name === pName);
              return (
                <span
                  key={`selected-${pName}-${idx}`}
                  className="inline-flex items-center gap-2 rounded-full bg-lime-mist px-3 py-1 text-[0.8125rem] font-medium text-navy border border-lime-soft/80"
                >
                  {matchedProduct && (
                    <div className={`relative size-5 shrink-0 overflow-hidden rounded-full ${matchedProduct.tint}`}>
                      <Image
                        src={matchedProduct.image}
                        alt={matchedProduct.name}
                        fill
                        sizes="20px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span>{pName}</span>
                  <button
                    type="button"
                    onClick={() => toggleProduct(pName)}
                    className="grid size-4 place-items-center rounded-full bg-navy/10 text-navy hover:bg-navy hover:text-white transition-colors text-[0.6875rem] font-bold"
                    aria-label={`Remove ${pName}`}
                  >
                    ✕
                  </button>
                </span>
              );
            })}
            <button
              type="button"
              onClick={() => setSelectedProducts([])}
              className="ml-auto text-[0.75rem] font-semibold text-muted hover:text-navy underline self-center"
            >
              Clear all
            </button>
          </div>
        ) : (
          <div className="mb-3 rounded-2xl bg-white/80 p-3 border border-dashed border-navy/15 text-center text-[0.8125rem] text-muted">
            Select products below or search to add them to your quote.
          </div>
        )}

        {/* Search & Category Filter Header */}
        <div className="mb-3 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items (e.g. Strawberry, Salmon, Puree...)"
            className={`${inputClass()} bg-white text-[0.8125rem]`}
          />
        </div>

        {/* Category Pill Filter */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={`cat-${cat.id}`}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-3 py-1 text-[0.75rem] font-medium transition-colors ${
                  active
                    ? "bg-navy text-white shadow-sm"
                    : "bg-white text-muted hover:bg-line-soft hover:text-navy border border-line-soft"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Filtered Product Selection List with Small Product Images */}
        <div className="grid max-h-[16rem] gap-2 overflow-y-auto pr-1 no-scrollbar sm:grid-cols-2">
          {filteredProducts.map((product) => {
            const isChecked = selectedProducts.includes(product.name);
            return (
              <button
                key={`prod-${product.slug}`}
                type="button"
                onClick={() => toggleProduct(product.name)}
                className={`flex items-center justify-between gap-3 rounded-xl border p-2 text-left transition-[border-color,background-color] ${
                  isChecked
                    ? "border-navy bg-white shadow-sm ring-1 ring-navy/10"
                    : "border-line/70 bg-white/90 hover:border-lime-soft hover:bg-white"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`relative size-9 shrink-0 overflow-hidden rounded-lg ${product.tint}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="block truncate text-[0.8125rem] font-medium text-navy">
                      {product.name}
                    </span>
                    <span className="block truncate text-[0.6875rem] text-muted">
                      {product.categoryLabel}
                    </span>
                  </div>
                </div>

                <span
                  className={`grid size-5 shrink-0 place-items-center rounded-md border transition-colors ${
                    isChecked
                      ? "border-navy bg-navy text-white"
                      : "border-line bg-surface text-transparent"
                  }`}
                >
                  <CheckIcon className="size-3" />
                </span>
              </button>
            );
          })}

          {filteredProducts.length === 0 && (
            <div className="col-span-full py-4 text-center text-[0.8125rem] text-muted">
              No products found matching &ldquo;{searchQuery}&rdquo;.
            </div>
          )}
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
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            style={selectArrow}
            className={selectClass(error("volume"))}
            {...aria("volume")}
          >
            <option value="">Select a range</option>
            {volumes.map((option) => (
              <option key={`vol-${option}`} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Delivery frequency" htmlFor="frequency">
          <select
            id="frequency"
            name="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            style={selectArrow}
            className={selectClass()}
          >
            <option value="">Select a frequency</option>
            {frequencies.map((option) => (
              <option key={`freq-${option}`} value={option}>
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
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className={`${inputClass()} resize-y`}
          placeholder="We'd like 10 kg cases and a standing Tuesday delivery."
        />
      </Field>

      {/* Action Buttons: Email Submission + Instant WhatsApp Enquiry */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          withArrow
          disabled={pending}
          className="w-full sm:w-auto"
        >
          {pending ? "Sending…" : "Send Email Quote Request"}
        </Button>

        <button
          type="button"
          onClick={handleWhatsAppEnquiry}
          className="inline-flex h-[3.25rem] shrink-0 items-center justify-center gap-2.5 rounded-pill bg-[#25d366] px-6 text-[0.9375rem] font-semibold text-white shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#20bd5a] hover:shadow-[0_6px_20px_rgba(37,211,102,0.5)] active:translate-y-px w-full sm:w-auto"
        >
          <WhatsAppIcon className="size-5" />
          Send via WhatsApp
        </button>
      </div>

      <p className="text-[0.75rem] text-muted-soft">
        We use your details only to prepare this quote. No marketing lists.
      </p>
    </form>
  );
}
