export const site = {
  /** Consumer-facing brand this site represents. */
  name: "Breadberry Co.",
  /** Parent company. Breadberry Co. is its signature brand. */
  company: "Adhira Enterprises",
  founded: "2020",
  founder: "Mrs. Sonal Yerunkar",
  city: "Mumbai",
  tagline: "Premium Frozen Berries & Purees",
  description:
    "Breadberry Co., a signature brand of Adhira Enterprises, supplies premium frozen berries and fruit purees to Mumbai's 5-star hotels, fine-dining restaurants, premium confectioneries and artisanal bakers.",
  clientsServed: "1000+",

  // TODO: replace with the real contact details before launch.
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  email: "orders@breadberry.co.in",
  address: "Mumbai, Maharashtra, India",
  hours: "Mon–Sat · 9:00 – 18:30 IST",
  url: "https://breadberry.co.in",
} as const;

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Why Us", href: "/why-us" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/**
 * Kitchens, hotel groups, cafés and retail brands supplied by
 * Adhira Enterprises. Split into two rows for the opposing marquees.
 * Rendered as type — replace with vector logos once licensed artwork exists.
 */
export const clientsRowOne = [
  "Taj Hotels",
  "JW Marriott",
  "Oberoi",
  "Hyatt",
  "Fortune Park Lakecity",
  "Bastian",
  "Olive Bar & Cafe",
  "Mainland China",
  "Mizu",
] as const;

export const clientsRowTwo = [
  "Theobroma",
  "Blue Tokai",
  "PAUL",
  "Pizza Express",
  "Merwans",
  "Parsi Dairy Farm",
  "Milky Mist",
  "Mapro",
  "EVE",
] as const;

export const clients = [...clientsRowOne, ...clientsRowTwo];
