import { site } from "@/lib/site";

/**
 * Builds a clean, modern email draft and equivalent WhatsApp message from the
 * submitted form values. Only filled fields appear in the draft — no blank
 * lines or placeholder labels.
 */
export function enquiryLinks(
  subject: string,
  values: Record<string, string>
) {
  /* ── Clean, structured email body ─────────────────────────────────────── */
  const lines: string[] = [];

  lines.push(`Hi ${site.company},`);
  lines.push("");
  lines.push("I'd like to enquire about your products/services.");
  lines.push("");

  /* Contact details block — only filled values show. */
  const contact: string[] = [];
  if (values.name) contact.push(`Name: ${values.name.trim()}`);
  if (values.company) contact.push(`Business: ${values.company.trim()}`);
  if (values.email) contact.push(`Email: ${values.email.trim()}`);
  if (values.phone) contact.push(`Phone: ${values.phone.trim()}`);
  if (values.city) contact.push(`City: ${values.city.trim()}`);

  if (contact.length) {
    lines.push("── Contact ──────────────────────────");
    lines.push(...contact);
    lines.push("");
  }

  /* Product / requirement details block. */
  const details: string[] = [];
  if (values.products) details.push(`Products: ${values.products.trim()}`);
  if (values.volume) details.push(`Volume: ${values.volume.trim()}`);
  if (values.frequency) details.push(`Frequency: ${values.frequency.trim()}`);

  if (details.length) {
    lines.push("── Requirements ─────────────────────");
    lines.push(...details);
    lines.push("");
  }

  /* Free-form message or notes. */
  const msg = (values.message || values.notes || "").trim();
  if (msg) {
    lines.push("── Message ──────────────────────────");
    lines.push(msg);
    lines.push("");
  }

  lines.push("────────────────────────────────────");
  lines.push(`Sent from ${site.url}`);

  const body = lines.join("\n");
  const query = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return {
    mailto: `mailto:${site.email}?${query}`,
    whatsapp: `${site.whatsappHref}?text=${encodeURIComponent(body)}`,
  };
}
