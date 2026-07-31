export const site = {
  /** Consumer-facing brand this site represents. */
  name: "Breadberry Co.",
  /** Parent company. Breadberry Co. is its signature brand. */
  company: "Adhira Enterprises",
  /**
   * Spellings people actually search for. "Adira Enterprises" is a common
   * variant of the registered name, so both are declared as entity aliases and
   * used in copy/metadata — searching either should find this site.
   */
  alternateNames: [
    "Adira Enterprises",
    "Adhira Enterprise",
    "Breadberry",
    "Breadberry by Adhira Enterprises",
    "Breadberry by Adira Enterprises",
  ],
  founded: "2020",
  founder: "Mrs. Sonal Yerunkar",
  city: "Mumbai",
  region: "Maharashtra",
  country: "IN",
  /** Machine-readable form of `hours`, for opening-hours structured data. */
  openingHours: "Mo-Sa 09:00-18:30",
  tagline: "Premium Frozen Berries & Purees",
  description:
    "Breadberry Co., a signature brand of Adhira Enterprises, supplies premium frozen berries and fruit purees to Mumbai's 5-star hotels, fine-dining restaurants, premium confectioneries and artisanal bakers.",
  clientsServed: "1000+",

  /** Named contact for every enquiry channel on the site. */
  contact: "Abhishek Yerunkar",
  phone: "+91 85540 44055",
  phoneHref: "tel:+918554044055",
  /** Enquiries hand off to this WhatsApp thread. Digits only, no spaces. */
  whatsapp: "918554044055",
  whatsappHref: "https://wa.me/918554044055",
  // TODO: confirm the mailbox before launch.
  email: "orders@breadberry.co.in",
  address: "Mumbai, Maharashtra, India",
  hours: "Mon–Sat · 9:00 – 18:30 IST",
  url: "https://breadberry.co.in",
} as const;

/**
 * Social profiles. TODO: replace with the real handles — the footer row
 * renders only while this array has entries, so clear it rather than
 * shipping dead links.
 */
export const social: { label: string; href: string }[] = [
  { label: "Instagram", href: "https://instagram.com/breadberry.co" },
  { label: "LinkedIn", href: "https://linkedin.com/company/adhira-enterprises" },
];

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
 * Adhira Enterprises. Ordered to alternate long and short names so the
 * single marquee row reads with an even rhythm.
 *
 * Rendered as type — replace with vector logos once licensed artwork exists.
 */
export const clients = [
  "Taj Hotels",
  "Theobroma",
  "JW Marriott",
  "Blue Tokai",
  "Oberoi",
  "PAUL",
  "Hyatt",
  "Pizza Express",
  "Fortune Park Lakecity",
  "Merwans",
  "Bastian",
  "Parsi Dairy Farm",
  "Olive Bar & Cafe",
  "Milky Mist",
  "Mainland China",
  "Mapro",
  "Mizu",
  "EVE",
] as const;
