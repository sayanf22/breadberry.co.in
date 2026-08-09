"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, inputClass, selectArrow, selectClass } from "@/components/ui/Field";
import { CheckIcon, WhatsAppIcon } from "@/components/icons";
import { enquiryLinks } from "@/lib/enquiry";
import { categories, products } from "@/lib/products";
import { site } from "@/lib/site";

const volumes = [
  "Under 25 kg / month",
  "25 – 100 kg / month",
  "100 – 500 kg / month",
  "500 kg+ / month",
];

const frequencies = ["One-off trial", "Monthly", "Fortnightly", "Weekly"];

export function QuoteForm() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [volume, setVolume] = useState("");
  const [frequency, setFrequency] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Defer URL hydration until after the initial React commit.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const queryProducts = new URLSearchParams(window.location.search).get(
        "products"
      );
      if (!queryProducts) return;

      const items = queryProducts
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      setSelectedProducts((previous) =>
        Array.from(new Set([...previous, ...items]))
      );
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const error = (key: string) => errors[key];
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

  const quoteValues = () => ({
    name,
    company,
    role,
    email,
    phone,
    city,
    products: selectedProducts.join(", "),
    volume,
    frequency,
    notes,
  });

  const draftLinks = () => {
    const nextErrors: Record<string, string> = {};
    if (name.trim().length < 2) nextErrors.name = "Please enter your name.";
    if (company.trim().length < 2)
      nextErrors.company = "Please enter your business name.";
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email.trim()))
      nextErrors.email = "Please enter a valid work email address.";
    if (phone.replace(/\D/g, "").length < 8)
      nextErrors.phone = "Please enter a reachable phone number.";
    if (city.trim().length < 2)
      nextErrors.city = "Which city should we deliver to?";
    if (!selectedProducts.length)
      nextErrors.products = "Select at least one product.";
    if (!volume) nextErrors.volume = "Choose an approximate monthly volume.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return null;
    return enquiryLinks(`Quote request for ${site.name}`, quoteValues());
  };

  const handleEmailEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const draft = draftLinks();
    if (draft) window.location.href = draft.mailto;
  };

  const handleWhatsAppEnquiry = () => {
    const draft = draftLinks();
    if (draft) window.open(draft.whatsapp, "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={handleEmailEnquiry} noValidate className="flex flex-col gap-6">
      {Object.keys(errors).length > 0 && (
        <p
          role="alert"
          className="rounded-2xl border border-berry/25 bg-[#fdf2f4] px-4 py-3 text-[0.8125rem] font-medium text-berry"
        >
          Please check the highlighted fields.
        </p>
      )}

      {/* State-managed selection is included in both generated drafts. */}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          className="w-full sm:w-auto"
        >
          Open Email Draft
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
