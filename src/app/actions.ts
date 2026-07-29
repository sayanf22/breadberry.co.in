"use server";

/**
 * Form handling for the contact and quote forms.
 *
 * Validation runs on the server so the forms work with JavaScript disabled.
 * `deliver()` is the single integration point — swap the console call for a
 * transactional email provider or CRM webhook when credentials are available.
 */

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
  values?: Record<string, string>;
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
    message: `Thanks ${values.name.split(" ")[0]} — your message is with our team. We reply within one working day.`,
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
    message: `Thanks ${values.name.split(" ")[0]} — your quote request is in. Expect pricing and dispatch dates within one working day.`,
  };
}
