import { site } from "@/lib/site";

const labels: Record<string, string> = {
  name: "Name",
  company: "Business",
  role: "Role",
  email: "Email",
  phone: "Phone",
  city: "Delivery city",
  products: "Products",
  volume: "Monthly volume",
  frequency: "Frequency",
  message: "Message",
  notes: "Notes",
};

/** Build equivalent device-email and WhatsApp drafts from one enquiry. */
export function enquiryLinks(
  subject: string,
  values: Record<string, string>
) {
  const details = Object.entries(values)
    .filter(([, value]) => value.trim())
    .map(([key, value]) => `${labels[key] ?? key}: ${value.trim()}`);
  const body = [
    `Hello ${site.company},`,
    "",
    "Please find my enquiry details below:",
    "",
    ...details,
  ].join("\n");
  const query = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return {
    mailto: `mailto:${site.email}?${query}`,
    whatsapp: `${site.whatsappHref}?text=${encodeURIComponent(body)}`,
  };
}
