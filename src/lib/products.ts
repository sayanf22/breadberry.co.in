export type ProductCategory = "iqf" | "puree";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  image: string;
  tint: string;
  blurb: string;
  specs: { label: string; value: string }[];
};

export const categories: { id: "all" | ProductCategory; label: string }[] = [
  { id: "all", label: "All Products" },
  { id: "iqf", label: "IQF Berries" },
  { id: "puree", label: "Fruit Purees" },
];

export const products: Product[] = [
  {
    slug: "frozen-blueberry",
    name: "Frozen Blueberry",
    category: "iqf",
    categoryLabel: "IQF Berries",
    image: "/assets/product-blueberry.webp",
    tint: "bg-tint-blueberry",
    blurb:
      "Plump, deep-indigo berries individually quick frozen within hours of harvest to hold their shape through bake and blend.",
    specs: [
      { label: "Grade", value: "Whole, Class I" },
      { label: "Pack", value: "1 kg / 10 kg" },
      { label: "Brix", value: "10 – 13°" },
    ],
  },
  {
    slug: "frozen-raspberry",
    name: "Frozen Raspberry",
    category: "iqf",
    categoryLabel: "IQF Berries",
    image: "/assets/product-raspberry.webp",
    tint: "bg-tint-raspberry",
    blurb:
      "Bright, tangy raspberries with an even ruby colour — built for plating, coulis and viennoiserie fillings.",
    specs: [
      { label: "Grade", value: "Whole, Class I" },
      { label: "Pack", value: "1 kg / 10 kg" },
      { label: "Brix", value: "9 – 11°" },
    ],
  },
  {
    slug: "frozen-strawberry",
    name: "Frozen Strawberry",
    category: "iqf",
    categoryLabel: "IQF Berries",
    image: "/assets/product-strawberry.webp",
    tint: "bg-tint-strawberry",
    blurb:
      "Calibrated whole and sliced strawberries, de-stemmed and graded for consistent yield across every batch.",
    specs: [
      { label: "Grade", value: "Whole / Sliced" },
      { label: "Pack", value: "1 kg / 10 kg" },
      { label: "Brix", value: "7 – 9°" },
    ],
  },
  {
    slug: "passion-fruit-puree",
    name: "Passion Fruit Puree",
    category: "puree",
    categoryLabel: "Fruit Puree",
    image: "/assets/product-passionfruit.webp",
    tint: "bg-tint-passion",
    blurb:
      "Aseptic single-origin passion fruit puree, unsweetened, with the full aromatic lift of fresh-cut fruit.",
    specs: [
      { label: "Composition", value: "100% fruit" },
      { label: "Pack", value: "1 kg tub" },
      { label: "Brix", value: "14 – 16°" },
    ],
  },
  {
    slug: "blueberry-puree",
    name: "Blueberry Puree",
    category: "puree",
    categoryLabel: "Fruit Puree",
    image: "/assets/product-blueberry.webp",
    tint: "bg-tint-blueberry",
    blurb:
      "Smooth, seed-free blueberry puree with a deep natural colour that survives heat without dulling.",
    specs: [
      { label: "Composition", value: "100% fruit" },
      { label: "Pack", value: "1 kg tub" },
      { label: "Brix", value: "11 – 13°" },
    ],
  },
  {
    slug: "raspberry-puree",
    name: "Raspberry Puree",
    category: "puree",
    categoryLabel: "Fruit Puree",
    image: "/assets/product-raspberry.webp",
    tint: "bg-tint-raspberry",
    blurb:
      "Sieved raspberry puree with balanced acidity — a reliable base for sorbet, glaze and mousse.",
    specs: [
      { label: "Composition", value: "100% fruit" },
      { label: "Pack", value: "1 kg tub" },
      { label: "Brix", value: "10 – 12°" },
    ],
  },
  {
    slug: "strawberry-puree",
    name: "Strawberry Puree",
    category: "puree",
    categoryLabel: "Fruit Puree",
    image: "/assets/product-strawberry.webp",
    tint: "bg-tint-strawberry",
    blurb:
      "Ripe-picked strawberry puree, gently pasteurised to keep the fresh, jammy top notes intact.",
    specs: [
      { label: "Composition", value: "100% fruit" },
      { label: "Pack", value: "1 kg tub" },
      { label: "Brix", value: "8 – 10°" },
    ],
  },
  {
    slug: "mixed-berry-blend",
    name: "Mixed Berry Blend",
    category: "iqf",
    categoryLabel: "IQF Berries",
    image: "/assets/product-raspberry.webp",
    tint: "bg-tint-raspberry",
    blurb:
      "A four-berry IQF blend — strawberry, blueberry, raspberry and blackberry — portioned to a fixed ratio.",
    specs: [
      { label: "Grade", value: "Whole mix" },
      { label: "Pack", value: "1 kg / 10 kg" },
      { label: "Brix", value: "8 – 12°" },
    ],
  },
];

export const featuredProducts = products.slice(0, 4);
