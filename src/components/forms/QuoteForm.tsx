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

/**
 * Quote form — only product selection is truly required. Everything else is
 * optional so a buyer can fire off a quick quote request without friction.
 */
export function QuoteForm() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [volume, setVolume] = useState("");
  const [frequency, setFrequency] = useState("");
  const [notes, setNotes] = useState("");
  const [showMessageError, setShowMessageError] = useState(false);

  // Pre-fill from URL ?products=... (e.g. from a product detail page CTA).
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const param = new URLSearchParams(window.location.search).get("products");
      if (!param) return;
      const items = param.split(",").map((s) => s.trim()).filter(Boolean);
      setSelectedProducts((prev) => Array.from(new Set([...prev, ...items])));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const toggleProduct = (productName: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productName)
        ? prev.filter((item) => item !== productName)
        : [...prev, productName]
    );
    setShowMessageError(false);
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDraft = () => {
    /* Only requirement: a message so the enquiry has substance. */
    if (!notes.trim()) {
      setShowMessageError(true);
      return null;
    }
    return enquiryLinks(`Quote request — ${site.name}`, {
      name,
      company,
      email,
      phone,
      city,
      products: selectedProducts.join(", "),
      volume,
      frequency,
      message: notes,
    });
  };

  const handleEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const draft = getDraft();
    if (draft) window.location.href = draft.mailto;
  };

  const handleWhatsApp = () => {
    const draft = getDraft();
    if (draft) window.open(draft.whatsapp, "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={handleEmail} noValidate className="flex flex-col gap-6">
      {/* ── Product selector (optional) ─────────────────────────────── */}
      <fieldset className="rounded-panel border border-line-soft bg-surface/50 p-4 sm:p-5">
        <legend className="mb-3 text-eyebrow font-semibold uppercase text-blue">
          Select products (optional)
        </legend>

        {/* Selected chips */}
        {selectedProducts.length > 0 ? (
          <div className="mb-4 flex flex-wrap gap-2 rounded-2xl bg-white p-3 border border-lime-soft shadow-soft">
            {selectedProducts.map((pName, idx) => {
              const matched = products.find((item) => item.name === pName);
              return (
                <span
                  key={`selected-${pName}-${idx}`}
                  className="inline-flex items-center gap-2 rounded-full bg-lime-mist px-3 py-1 text-[0.8125rem] font-medium text-navy border border-lime-soft/80"
                >
                  {matched && (
                    <div className={`relative size-5 shrink-0 overflow-hidden rounded-full ${matched.tint}`}>
                      <Image src={matched.image} alt={matched.name} fill sizes="20px" className="object-cover" />
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
            Tap products below to add them to your quote.
          </div>
        )}

        {/* Search */}
        <div className="mb-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search (e.g. Strawberry, Salmon, Puree…)"
            className={`${inputClass()} bg-white text-[0.8125rem]`}
          />
        </div>

        {/* Category pills */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={`cat-${cat.id}`}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-3 py-1 text-[0.75rem] font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-navy text-white shadow-sm"
                  : "bg-white text-muted hover:bg-line-soft hover:text-navy border border-line-soft"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid max-h-[16rem] gap-2 overflow-y-auto pr-1 no-scrollbar sm:grid-cols-2">
          {filteredProducts.map((product) => {
            const checked = selectedProducts.includes(product.name);
            return (
              <button
                key={`prod-${product.slug}`}
                type="button"
                onClick={() => toggleProduct(product.name)}
                className={`flex items-center justify-between gap-3 rounded-xl border p-2 text-left transition-[border-color,background-color] ${
                  checked
                    ? "border-navy bg-white shadow-sm ring-1 ring-navy/10"
                    : "border-line/70 bg-white/90 hover:border-lime-soft hover:bg-white"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`relative size-9 shrink-0 overflow-hidden rounded-lg ${product.tint}`}>
                    <Image src={product.image} alt={product.name} fill sizes="36px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <span className="block truncate text-[0.8125rem] font-medium text-navy">{product.name}</span>
                    <span className="block truncate text-[0.6875rem] text-muted">{product.categoryLabel}</span>
                  </div>
                </div>
                <span className={`grid size-5 shrink-0 place-items-center rounded-md border transition-colors ${
                  checked ? "border-navy bg-navy text-white" : "border-line bg-surface text-transparent"
                }`}>
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

        {showMessageError && (
          <p role="alert" className="mt-3 text-[0.75rem] font-medium text-berry">
            Please describe what you need so we can prepare your quote.
          </p>
        )}
      </fieldset>

      {/* ── Optional details (all optional) ──────────────────────────── */}
      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 text-eyebrow font-semibold uppercase text-blue">
          Your details (optional)
        </legend>

        <Field label="Name" htmlFor="name">
          <input id="name" name="name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass()} placeholder="Aarav Mehta" />
        </Field>

        <Field label="Business" htmlFor="company">
          <input id="company" name="company" type="text" autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} className={inputClass()} placeholder="Olive Bistro" />
        </Field>

        <Field label="Email" htmlFor="email">
          <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass()} placeholder="chef@yourvenue.com" />
        </Field>

        <Field label="Phone" htmlFor="phone">
          <input id="phone" name="phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass()} placeholder="+91 98765 43210" />
        </Field>

        <Field label="Delivery city" htmlFor="city">
          <input id="city" name="city" type="text" autoComplete="address-level2" value={city} onChange={(e) => setCity(e.target.value)} className={inputClass()} placeholder="Mumbai" />
        </Field>

        <Field label="Volume" htmlFor="volume">
          <select id="volume" name="volume" value={volume} onChange={(e) => setVolume(e.target.value)} style={selectArrow} className={selectClass()}>
            <option value="">Monthly volume (optional)</option>
            {volumes.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>

        <Field label="Frequency" htmlFor="frequency">
          <select id="frequency" name="frequency" value={frequency} onChange={(e) => setFrequency(e.target.value)} style={selectArrow} className={selectClass()}>
            <option value="">Delivery frequency (optional)</option>
            {frequencies.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
      </fieldset>

      <Field label="Your message" htmlFor="notes" required hint="What do you need? Products, quantities, delivery city — anything useful.">
        <textarea id="notes" name="notes" rows={4} required value={notes} onChange={(e) => { setNotes(e.target.value); setShowMessageError(false); }} className={`${inputClass(showMessageError ? "required" : undefined)} resize-y`} placeholder="We need 50 kg of IQF strawberries and 20 kg of blueberry puree delivered weekly to Mumbai." />
      </Field>

      {/* ── Actions ──────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" withArrow className="w-full sm:w-auto">
          Send Enquiry
        </Button>
        <button
          type="button"
          onClick={handleWhatsApp}
          className="inline-flex h-[3.25rem] w-full items-center justify-center gap-2.5 rounded-pill bg-[#25d366] px-6 text-[0.9375rem] font-semibold text-white shadow-[0_4px_16px_rgba(37,211,102,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#20bd5a] sm:w-auto"
        >
          <WhatsAppIcon className="size-5" />
          WhatsApp
        </button>
      </div>

      <p className="text-[0.75rem] text-muted-soft">
        Opens your email or WhatsApp app with a pre-filled draft. Nothing is sent until you confirm.
      </p>
    </form>
  );
}
