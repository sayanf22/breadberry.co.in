"use server";

import { site } from "@/lib/site";

/**
 * Form handling for the contact and quote forms.
 *
 * Validation runs on the server so the forms work with JavaScript disabled.
 * `deliver()` is the single integration point — swap the console call for a
 * transactional email provider or CRM webhook when credentials are available.
 *
 * On success the enquiry is also handed to WhatsApp: the action returns a
 * prefilled `wa.me` link and the success panel continues the conversation
 * there, so nothing is lost while email delivery is still a placeholder.
 */

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
  values?: Record<string, string>;
  /** Prefilled WhatsApp thread for the submitted enquiry. */
  whatsapp?: string;
};

export const initialFormState: FormState = { status: "idle" };

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

function text(data: FormData, key: string) {
  const value = data.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function collect(data: FormData, keys: string[]) {
  return Object.fromEntries(keys.map((key) => [key, text(data, key)]));
}

async function deliver(subject: string, payload: Record<string, string>) {
  // Replace with your provider, e.g. await resend.emails.send({ ... })
  console.info(`[breadberry] ${subject}`, payload);
}

/** Human labels for the WhatsApp message, in the order they should read. */
const FIELD_LABELS: Record<string, string> = {
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

/**
 * Builds the prefilled WhatsApp link. Empty optional fields are dropped so the
 * message stays short enough to read on a phone.
 */
function whatsappHandoff(subject: string, values: Record<string, string>) {
  const lines = [
    subject,
    ...Object.entries(values)
      .filter(([, value]) => value)
      .map(([key, value]) => `${FIELD_LABELS[key] ?? key}: ${value}`),
  ];

  return `${site.whatsappHref}?text=${encodeURIComponent(lines.join("\n"))}`;
}

const contactFields = ["name", "company", "email", "phone", "message"];

export async function submitContact(
  _previous: FormState,
  data: FormData
): Promise<FormState> {
  const values = collect(data, contactFields);
  const errors: Record<string, string> = {};

  if (values.name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL.test(values.email))
    errors.email = "Please enter a valid work email address.";
  if (values.message.length < 10)
    errors.message = "A little more detail helps us route your enquiry.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
      values,
    };
  }

  await deliver("New contact enquiry", values);

  return {
    status: "success",
    message: `Thanks ${values.name.split(" ")[0]} — we're opening WhatsApp so you can send this straight to ${site.contact}.`,
    whatsapp: whatsappHandoff(`New enquiry for ${site.name}`, values),
  };
}

const quoteFields = [
  "name",
  "company",
  "role",
  "email",
  "phone",
  "city",
  "products",
  "volume",
  "frequency",
  "notes",
];

export async function submitQuote(
  _previous: FormState,
  data: FormData
): Promise<FormState> {
  const values = collect(data, quoteFields);
  values.products = data.getAll("products").join(", ");

  const errors: Record<string, string> = {};

  if (values.name.length < 2) errors.name = "Please enter your name.";
  if (values.company.length < 2)
    errors.company = "Please enter your business name.";
  if (!EMAIL.test(values.email))
    errors.email = "Please enter a valid work email address.";
  if (values.phone.replace(/\D/g, "").length < 8)
    errors.phone = "Please enter a reachable phone number.";
  if (values.city.length < 2) errors.city = "Which city should we deliver to?";
  if (!values.products) errors.products = "Select at least one product.";
  if (!values.volume) errors.volume = "Choose an approximate monthly volume.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
      values,
    };
  }

  await deliver("New quote request", values);

  return {
    status: "success",
    message: `Thanks ${values.name.split(" ")[0]} — we're opening WhatsApp so ${site.contact} can price this for you.`,
    whatsapp: whatsappHandoff(`Quote request for ${site.name}`, values),
  };
}
