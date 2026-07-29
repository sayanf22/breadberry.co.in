export type MonogramTone = "blue" | "green" | "berry" | "amber";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  tone: MonogramTone;
  /** Card width. Mixed widths keep the row from reading as a grid. */
  size: "sm" | "md" | "lg";
  /** Vertical stagger step (0–2). Held in data so both marquee copies match. */
  offset: 0 | 1 | 2;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "The raspberries hold their shape through a 190 °C bake. That one thing rewrote our whole summer dessert menu.",
    name: "Ananya Iyer",
    role: "Executive Pastry Chef, Olive Bistro",
    tone: "berry",
    size: "lg",
    offset: 0,
  },
  {
    quote:
      "Brix is consistent lot to lot. Our sorbet base hasn't needed adjusting in a year.",
    name: "Meera Nair",
    role: "Head of Gelato, Frost & Co.",
    tone: "green",
    size: "sm",
    offset: 2,
  },
  {
    quote:
      "A certificate of analysis lands with every consignment. Our audits went from a two-day scramble to one afternoon.",
    name: "Rohan Kulkarni",
    role: "F&B Purchase Head, hotel group",
    tone: "blue",
    size: "md",
    offset: 1,
  },
  {
    quote:
      "Four cafés on one standing Tuesday delivery. Nine months in, not a single missed window.",
    name: "Aditya Sharma",
    role: "Operations Director, Roast Collective",
    tone: "amber",
    size: "sm",
    offset: 0,
  },
  {
    quote:
      "The passion fruit puree tastes like fresh-cut fruit. Our bar team built three cocktails around it in the first week.",
    name: "Kabir Menon",
    role: "Beverage Lead, Terrace 21",
    tone: "blue",
    size: "md",
    offset: 2,
  },
  {
    quote:
      "Pack sizes from 1 kg let us trial properly before committing. That is rare in this category.",
    name: "Sneha Deshpande",
    role: "Founder, Batter & Bloom",
    tone: "green",
    size: "sm",
    offset: 1,
  },
  {
    quote:
      "Colour holds all the way through pasteurisation, which matters when the glaze is the whole dish.",
    name: "Vikram Rao",
    role: "Chef Pâtissier, The Conservatory",
    tone: "berry",
    size: "md",
    offset: 0,
  },
  {
    quote: "They schedule around our prep days, not their delivery routes.",
    name: "Priya Menon",
    role: "Kitchen Manager, Saffron House",
    tone: "amber",
    size: "sm",
    offset: 2,
  },
];

export type Outcome = {
  /** Metric-led claim, set in the display serif. */
  title: string;
  quote: string;
  name: string;
  role: string;
  tone: MonogramTone;
  href: string;
  /** Bento footprint — `lg` cards take the wider column. */
  size: "lg" | "sm";
};

/** Outcome cards shown beneath the quote row. */
export const outcomes: Outcome[] = [
  {
    title: "Nine months, zero missed windows",
    quote: "Our prep list has never once waited on a delivery.",
    name: "Aditya Sharma",
    role: "Operations Director, Roast Collective",
    tone: "amber",
    href: "/why-us",
    size: "lg",
  },
  {
    title: "Under six hours to frozen",
    quote: "The fruit tastes like it was picked that morning.",
    name: "Meera Nair",
    role: "Head of Gelato, Frost & Co.",
    tone: "green",
    href: "/why-us",
    size: "sm",
  },
  {
    title: "Audits down to an afternoon",
    quote: "Every lot arrives documented. Nothing to chase.",
    name: "Rohan Kulkarni",
    role: "F&B Purchase Head, hotel group",
    tone: "blue",
    href: "/why-us",
    size: "sm",
  },
  {
    title: "From 1 kg to a full pallet",
    quote: "We trialled three lines before scaling any of them.",
    name: "Sneha Deshpande",
    role: "Founder, Batter & Bloom",
    tone: "berry",
    href: "/products",
    size: "lg",
  },
];
