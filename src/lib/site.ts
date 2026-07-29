export const site = {
  name: "Breadberry Co.",
  tagline: "Premium Frozen Berries & Purees",
  description:
    "High-quality frozen fruits and purees for restaurants, cafés & businesses. IQF berries and single-origin purees supplied in bulk with an unbroken cold chain.",
  url: "https://breadberry.co",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  email: "orders@breadberry.co",
  address: "Unit 14, Cold Chain Park, Pune, Maharashtra 411057, India",
  hours: "Mon–Sat · 9:00 – 18:30 IST",
} as const;

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Why Us", href: "/why-us" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Wordmarks shown in the trust strip. Replace `src` with supplied logo files. */
export const trustedBy = [
  { name: "TAJ", sub: "Hotels & Palaces" },
  { name: "Radisson", sub: "Hotels & Resorts" },
  { name: "The Oberoi", sub: "Group" },
  { name: "ITC Hotels", sub: "Responsible Luxury" },
  { name: "The Leela", sub: "Palaces Hotels Resorts" },
] as const;
