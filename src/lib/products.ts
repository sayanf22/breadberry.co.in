/**
 * The supplied catalogue.
 *
 * Every record here comes from the product photography supplied by Adhira
 * Enterprises (see `scripts/import-product-assets.mjs`); names follow the
 * supplied file names and each `slug` matches its generated pack shot.
 *
 * Pack sizes are quoted per enquiry rather than published, so `Pack` reads
 * "On request" until real spec sheets are supplied.
 */
export type ProductCategory =
  | "iqf"
  | "puree"
  | "fresh"
  | "japanese"
  | "seafood";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  image: string;
  /** Alt text — deliberately not "retail pack": some shots are loose product. */
  imageAlt: string;
  tint: string;
  /** How the line is supplied. Shown on the card and as the first spec. */
  form: string;
  /** Short buying signal carried as the card badge. */
  chain: ColdChain;
  blurb: string;
  specs: { label: string; value: string }[];
  handling: string[];
};

export type CategoryInfo = {
  id: "all" | ProductCategory;
  label: string;
  subtitle: string;
  itemsPreview: string;
  chainTag: string;
};

export const categories: CategoryInfo[] = [
  {
    id: "all",
    label: "All Products",
    subtitle: "Wholesale Catalogue",
    itemsPreview: "77 Foodservice Lines • Berries, Purees, Produce, Catering & Seafood",
    chainTag: "Cold-Chain Certified",
  },
  {
    id: "iqf",
    label: "IQF Berries",
    subtitle: "Individually Quick Frozen",
    itemsPreview: "Strawberries, Blueberries, Raspberries, Blackberries, Cranberries & Mix",
    chainTag: "−18 °C Frozen",
  },
  {
    id: "puree",
    label: "Fruit Purees",
    subtitle: "Patisserie & Beverage Bases",
    itemsPreview: "Strawberry, Raspberry, Blueberry, Passionfruit & Acai Purees",
    chainTag: "−18 °C Frozen",
  },
  {
    id: "fresh",
    label: "Fresh Produce",
    subtitle: "Chilled Farm Supply",
    itemsPreview: "Avocados, Asparagus, Fresh Berries & Specialty Culinary Greens",
    chainTag: "2 – 6 °C Chilled",
  },
  {
    id: "japanese",
    label: "Bakery & Japanese",
    subtitle: "Commercial Catering Lines",
    itemsPreview: "Edamame, Gyoza, Spring Rolls, Panko, Nori & Bakery Essentials",
    chainTag: "−18 °C Frozen",
  },
  {
    id: "seafood",
    label: "Frozen Seafood",
    subtitle: "Grade-A Marine Stock",
    itemsPreview: "Salmon, White Shrimp, Squid, Crabcakes & Ocean Fish Fillets",
    chainTag: "−18 °C Frozen",
  },
];

const CATEGORY_LABEL: Record<ProductCategory, string> = {
  iqf: "IQF Berries",
  puree: "Fruit Purees",
  fresh: "Fresh Produce",
  japanese: "Bakery & Japanese",
  seafood: "Frozen Seafood",
};

/** One tint per category; individual lines can override for fruit colour. */
const CATEGORY_TINT: Record<ProductCategory, string> = {
  iqf: "bg-tint-raspberry",
  puree: "bg-tint-passion",
  fresh: "bg-tint-leaf",
  japanese: "bg-tint-sand",
  seafood: "bg-tint-ocean",
};

/**
 * Cold chain per range. Single source for both the card badge and the storage
 * spec, so the short and long forms can never drift apart.
 */
export type ColdChain = "Frozen" | "Chilled";

const CATEGORY_CHAIN: Record<ProductCategory, ColdChain> = {
  iqf: "Frozen",
  puree: "Frozen",
  fresh: "Chilled",
  japanese: "Frozen",
  seafood: "Frozen",
};

const CHAIN_STORAGE: Record<ColdChain, string> = {
  Frozen: "Frozen −18 °C",
  Chilled: "Chilled 2 – 6 °C",
};

/**
 * Handling notes differ by category — the frozen lines are the only ones that
 * carry a −18 °C instruction, so fresh produce never inherits it.
 */
const CATEGORY_HANDLING: Record<ProductCategory, string[]> = {
  iqf: [
    "Store at −18 °C or below; do not refreeze after thawing.",
    "Cold chain unbroken from our walk-in to your door.",
    "Batch documentation issued on request.",
  ],
  puree: [
    "Store at −18 °C or below; thaw under refrigeration before use.",
    "Cold chain unbroken from our walk-in to your door.",
    "Batch documentation issued on request.",
  ],
  fresh: [
    "Chilled line — held at 2 – 6 °C, never frozen.",
    "Sourced to order, so availability moves with the season.",
    "Delivered in refrigerated transport, scheduled to your prep days.",
  ],
  japanese: [
    "Store at −18 °C or below; thaw under refrigeration before service.",
    "Keep sheets and skins wrapped until use to stop them drying out.",
    "Origin and batch documentation issued on request.",
  ],
  seafood: [
    "Store at −18 °C or below; thaw under refrigeration, never at room temperature.",
    "Origin documented per consignment.",
    "Delivered in insulated, temperature-logged transport.",
  ],
};

type Seed = {
  slug: string;
  name: string;
  category: ProductCategory;
  /** Shown as the first spec — the format the line is supplied in. */
  form: string;
  blurb: string;
  tint?: string;
};

function define({ slug, name, category, form, blurb, tint }: Seed): Product {
  const chain = CATEGORY_CHAIN[category];

  return {
    slug,
    name,
    category,
    categoryLabel: CATEGORY_LABEL[category],
    image: `/assets/products/${slug}.webp`,
    imageAlt: `${name} — ${CATEGORY_LABEL[category]}`,
    tint: tint ?? CATEGORY_TINT[category],
    form,
    chain,
    blurb,
    specs: [
      { label: "Form", value: form },
      { label: "Storage", value: CHAIN_STORAGE[chain] },
      { label: "Pack", value: "On request" },
    ],
    handling: CATEGORY_HANDLING[category],
  };
}

const seeds: Seed[] = [
  /* ── IQF berries — the Breadberry Co. signature line ─────────────────── */
  {
    slug: "strawberry-iqf-frozen",
    name: "Strawberry IQF Frozen",
    category: "iqf",
    form: "Whole, individually quick frozen",
    tint: "bg-tint-strawberry",
    blurb:
      "Individually quick frozen strawberries that keep their shape through bake and blend, graded for consistent yield.",
  },
  {
    slug: "blueberry-iqf-frozen",
    name: "Blueberry IQF Frozen",
    category: "iqf",
    form: "Whole, individually quick frozen",
    tint: "bg-tint-blueberry",
    blurb:
      "Deep-indigo berries frozen loose so you can weigh out exactly what a batch needs without thawing the rest.",
  },
  {
    slug: "raspberry-iqf-frozen",
    name: "Raspberry IQF Frozen",
    category: "iqf",
    form: "Whole, individually quick frozen",
    tint: "bg-tint-raspberry",
    blurb:
      "Bright, even ruby colour and a clean tart finish — built for plating, coulis and viennoiserie fillings.",
  },
  {
    slug: "blackberry-iqf-frozen",
    name: "Blackberry IQF Frozen",
    category: "iqf",
    form: "Whole, individually quick frozen",
    tint: "bg-tint-blueberry",
    blurb:
      "Full-flavoured blackberries with firm drupelets that hold up in tarts, compotes and plated desserts.",
  },
  {
    slug: "cranberry-iqf-frozen",
    name: "Cranberry IQF Frozen",
    category: "iqf",
    form: "Whole, individually quick frozen",
    tint: "bg-tint-raspberry",
    blurb:
      "Sharp, firm cranberries for festive bakes, sauces and studded breads where a sweet berry would flatten the dish.",
  },
  {
    slug: "mix-berry-iqf-frozen",
    name: "Mix Berry IQF Frozen",
    category: "iqf",
    form: "Mixed whole berries",
    tint: "bg-tint-raspberry",
    blurb:
      "A ready-portioned berry mix that saves your team weighing four lines separately for compotes and coulis.",
  },

  /* ── Fruit purees ─────────────────────────────────────────────────────── */
  {
    slug: "strawberry-puree-frozen",
    name: "Strawberry Puree Frozen",
    category: "puree",
    form: "Smooth fruit puree",
    tint: "bg-tint-strawberry",
    blurb:
      "Ripe-picked strawberry puree with the fresh, jammy top notes still intact — a dependable mousse and sorbet base.",
  },
  {
    slug: "raspberry-puree-frozen",
    name: "Raspberry Puree Frozen",
    category: "puree",
    form: "Sieved fruit puree",
    tint: "bg-tint-raspberry",
    blurb:
      "Seed-free raspberry puree with balanced acidity, so glazes and sorbets set with a clean finish.",
  },
  {
    slug: "blueberry-puree-frozen",
    name: "Blueberry Puree Frozen",
    category: "puree",
    form: "Smooth fruit puree",
    tint: "bg-tint-blueberry",
    blurb:
      "Deep natural colour that survives heat without dulling, for bakes, fillings and pâtisserie work.",
  },
  {
    slug: "passionfruit-puree-frozen",
    name: "Passionfruit Puree Frozen",
    category: "puree",
    form: "Smooth fruit puree",
    tint: "bg-tint-passion",
    blurb:
      "The full aromatic lift of fresh-cut passionfruit, with the acidity that cuts through cream and chocolate.",
  },
  {
    slug: "acai-berry-puree-frozen",
    name: "Acai Berry Puree Frozen",
    category: "puree",
    form: "Smooth fruit puree",
    tint: "bg-tint-blueberry",
    blurb:
      "Unsweetened acai puree for bowls, smoothies and plated desserts that need colour depth without added sugar.",
  },
];

seeds.push(
  /* ── Fresh imported produce ─────────────────────────────────────────────── */
  {
    slug: "asparagus-thai",
    name: "Asparagus Thai",
    category: "fresh",
    form: "Loose spears",
    blurb:
      "Slim Thai spears with a tender tip, quick to blanch and consistent enough to plate straight.",
  },
  {
    slug: "green-jumbo-peruvian-asparagus",
    name: "Green Jumbo Peruvian Asparagus",
    category: "fresh",
    form: "Jumbo grade spears",
    blurb:
      "Thick Peruvian spears that hold a bite after grilling — the grade to use when asparagus is the centre of the plate.",
  },
  {
    slug: "white-jumbo-peruvian-asparagus",
    name: "White Jumbo Peruvian Asparagus",
    category: "fresh",
    form: "Jumbo grade spears",
    blurb:
      "Blanched-white jumbo spears, mild and faintly sweet, for classical European service.",
  },
  {
    slug: "artichoke-heart-globe",
    name: "Artichoke Heart Globe",
    category: "fresh",
    form: "Whole globe hearts",
    blurb:
      "Globe artichokes with a firm, meaty heart for braising, grilling and antipasti.",
  },
  {
    slug: "broccolini-gailon-broccoli",
    name: "Broccolini Gailon Broccoli",
    category: "fresh",
    form: "Bunched stems",
    blurb:
      "Long, slender stems that cook evenly — a cleaner plate presentation than standard broccoli florets.",
  },
  {
    slug: "romanesco-cabbage",
    name: "Romanesco Cabbage",
    category: "fresh",
    form: "Whole heads",
    blurb:
      "Fractal chartreuse heads with a nutty, mild flavour, as good raw on a crudité board as roasted.",
  },
  {
    slug: "yellow-cauliflower",
    name: "Yellow Cauliflower",
    category: "fresh",
    form: "Whole heads",
    blurb:
      "Golden curds that keep their colour through roasting, for plates that need warmth without a sauce.",
  },
  {
    slug: "purple-cauliflower",
    name: "Purple Cauliflower",
    category: "fresh",
    form: "Whole heads",
    blurb:
      "Deep violet heads for contrast on a plate; the colour holds best roasted or served raw.",
  },
  {
    slug: "celeriac-celery-root",
    name: "Celeriac Celery Root",
    category: "fresh",
    form: "Whole roots",
    blurb:
      "Dense, aromatic root for purées, remoulade and roasting — a savoury base that behaves like a potato.",
  },
  {
    slug: "taro-root",
    name: "Taro Root",
    category: "fresh",
    form: "Whole roots",
    blurb:
      "Starchy taro for frying, steaming and dessert work across Asian and pan-Asian menus.",
  },
  {
    slug: "yam-bean",
    name: "Yam Bean",
    category: "fresh",
    form: "Whole roots",
    blurb:
      "Crisp, juicy jicama-style root that stays crunchy in salads, slaws and raw garnishes.",
  },
  {
    slug: "lotusroot-thai",
    name: "Lotusroot Thai",
    category: "fresh",
    form: "Whole roots",
    blurb:
      "Fresh lotus root with the lattice cross-section that makes a garnish look considered.",
  },
  {
    slug: "purple-potato",
    name: "Purple Potato",
    category: "fresh",
    form: "Whole tubers",
    blurb:
      "Firm purple-fleshed potatoes for crisps, terrines and side dishes that need colour.",
  },
  {
    slug: "purple-sweet-potato",
    name: "Purple Sweet Potato",
    category: "fresh",
    form: "Whole tubers",
    blurb:
      "Dense, sweet violet flesh — reliable for purées, pastry fillings and roasted sides.",
  },
  {
    slug: "orange-sweet-potato",
    name: "Orange Sweet Potato",
    category: "fresh",
    form: "Whole tubers",
    blurb:
      "The everyday sweet potato: sweet, smooth when cooked down, dependable in volume.",
  },
  {
    slug: "heirloom-tomato",
    name: "Heirloom Tomato",
    category: "fresh",
    form: "Mixed varieties",
    blurb:
      "Mixed heirloom varieties with real tomato flavour, for salads and plates served close to raw.",
  },
  {
    slug: "vine-cherry-tomato",
    name: "Vine Cherry Tomato",
    category: "fresh",
    form: "On the vine",
    blurb:
      "Cherry tomatoes still on the vine — sweet, even in size and presentable without trimming.",
  },
  {
    slug: "shishito-pepper",
    name: "Shishito Pepper",
    category: "fresh",
    form: "Loose peppers",
    blurb:
      "Thin-walled, mild peppers that blister in seconds — a fast, high-margin small plate.",
  },
  {
    slug: "red-long-chilli-thai",
    name: "Red Long Chilli Thai",
    category: "fresh",
    form: "Loose chillies",
    blurb:
      "Long red Thai chillies for measured heat, curry pastes and fine garnish work.",
  },
  {
    slug: "yellow-chilli-long-thai",
    name: "Yellow Chilli Long Thai",
    category: "fresh",
    form: "Loose chillies",
    blurb:
      "Fruity yellow Thai chillies, useful when a dish needs heat without red flecks through it.",
  },
  {
    slug: "snowpeas",
    name: "Snowpeas",
    category: "fresh",
    form: "Loose pods",
    blurb:
      "Flat, crisp pods for stir-fry and salad work, trimmed and ready to cook quickly.",
  },
  {
    slug: "sugar-snappeas",
    name: "Sugar Snappeas",
    category: "fresh",
    form: "Loose pods",
    blurb:
      "Sweet, plump pods with a firm snap — good raw, better with the briefest heat.",
  },
  {
    slug: "gem-lettuce",
    name: "Gem Lettuce",
    category: "fresh",
    form: "Whole heads",
    blurb:
      "Compact, sweet hearts with ribs sturdy enough to grill or hold a heavy dressing.",
  },
  {
    slug: "wild-roquette-arugula-leaves",
    name: "Wild Roquette Arugula Leaves",
    category: "fresh",
    form: "Loose leaf",
    blurb:
      "Peppery wild roquette with a fine leaf, for finishing pizza, carpaccio and salads.",
  },
  {
    slug: "shisho-leaves",
    name: "Shisho Leaves",
    category: "fresh",
    form: "Loose leaf",
    blurb:
      "Aromatic shiso for Japanese service, sashimi plating and garnish where the leaf is the accent.",
  },
  {
    slug: "shitake-mushroom",
    name: "Shitake Mushroom",
    category: "fresh",
    form: "Loose caps",
    blurb:
      "Meaty shiitake with deep umami — the workhorse mushroom for broths, sautés and dumplings.",
  },
  {
    slug: "enoki-mushroom",
    name: "Enoki Mushroom",
    category: "fresh",
    form: "Clustered bunches",
    blurb:
      "Fine, crisp enoki clusters for hot pots, broths and quick tempura.",
  },
  {
    slug: "shimeji-brown-mushroom",
    name: "Shimeji Brown Mushroom",
    category: "fresh",
    form: "Clustered bunches",
    blurb:
      "Nutty brown shimeji that keeps its bite in a pan and separates cleanly from the cluster.",
  },
  {
    slug: "shimeji-white-mushroom",
    name: "Shimeji White Mushroom",
    category: "fresh",
    form: "Clustered bunches",
    blurb:
      "Delicate white shimeji, milder than the brown, for lighter broths and plated garnish.",
  },
  {
    slug: "king-ceps-oyster-mushroom",
    name: "King Ceps Oyster Mushroom",
    category: "fresh",
    form: "Whole stems",
    blurb:
      "Thick king oyster stems that slice into scallop-like rounds and sear without collapsing.",
  },
  {
    slug: "portobello-mushroom",
    name: "Portobello Mushroom",
    category: "fresh",
    form: "Whole caps",
    blurb:
      "Broad, mature caps for grilling and stuffing — substantial enough to carry a main course.",
  },
  {
    slug: "porchini-mushroom",
    name: "Porchini Mushroom",
    category: "fresh",
    form: "Whole caps",
    blurb:
      "Porcini with the woodland depth that risotto, pasta and sauces are built around.",
  },
  {
    slug: "avocado-hass",
    name: "Avocado Hass",
    category: "fresh",
    form: "Whole fruit",
    blurb:
      "Hass avocados with the buttery flesh and reliable ripening curve a busy kitchen can plan around.",
  },
  {
    slug: "lemon-italian",
    name: "Lemon Italian",
    category: "fresh",
    form: "Whole fruit",
    blurb:
      "Thick-skinned Italian lemons — generous zest for pastry, clean juice for dressings.",
  },
  {
    slug: "pomello-thai",
    name: "Pomello Thai",
    category: "fresh",
    form: "Whole fruit",
    blurb:
      "Large Thai pomelo with firm, sweet segments that hold their shape in salads and desserts.",
  },
  {
    slug: "mangosteen",
    name: "Mangosteen",
    category: "fresh",
    form: "Whole fruit",
    blurb:
      "Fragrant, delicately sweet segments — a specialty fruit for plated desserts and amenity trays.",
  },
  {
    slug: "rambutan",
    name: "Rambutan",
    category: "fresh",
    form: "Whole fruit",
    blurb:
      "Sweet, lychee-like flesh in a striking shell, for dessert plates and buffet display.",
  },
  {
    slug: "strawberry-fresh",
    name: "Strawberry Fresh",
    category: "fresh",
    form: "Punnets",
    tint: "bg-tint-strawberry",
    blurb:
      "Fresh strawberries selected for even size and colour, for gateaux, plating and afternoon tea service.",
  },
  {
    slug: "blueberry-fresh",
    name: "Blueberry Fresh",
    category: "fresh",
    form: "Punnets",
    tint: "bg-tint-blueberry",
    blurb:
      "Firm fresh blueberries that survive handling on tarts, entremets and breakfast buffets.",
  },
  {
    slug: "raspberry-fresh",
    name: "Raspberry Fresh",
    category: "fresh",
    form: "Punnets",
    tint: "bg-tint-raspberry",
    blurb:
      "Fresh raspberries graded for intact drupelets — the berry that shows every bit of rough handling.",
  },
  {
    slug: "blackberry-fresh",
    name: "Blackberry Fresh",
    category: "fresh",
    form: "Punnets",
    tint: "bg-tint-blueberry",
    blurb:
      "Glossy fresh blackberries with firm structure, for pâtisserie finishing and dessert plates.",
  }
);

seeds.push(
  /* ── Frozen bakery, Japanese and pantry lines ───────────────────────────── */
  {
    slug: "gyoza-skin-sheet-happy-belly",
    name: "Gyoza Skin Sheet Happy Belly",
    category: "japanese",
    form: "Frozen sheets",
    blurb:
      "Round gyoza wrappers of even thickness, so a section can fold hundreds without splitting.",
  },
  {
    slug: "wonton-skin-sheet-happy-belly",
    name: "Wonton Skin Sheet Happy Belly",
    category: "japanese",
    form: "Frozen sheets",
    blurb:
      "Square wonton skins that separate cleanly from the stack once thawed — no wasted sheets.",
  },
  {
    slug: "peking-duck-sheet-happy-belly",
    name: "Peking Duck Sheet Happy Belly",
    category: "japanese",
    form: "Frozen sheets",
    blurb:
      "Thin pancakes for duck service, pliable after a short steam and consistent in diameter.",
  },
  {
    slug: "lotus-leaf-bun-bao-bun-happy-belly",
    name: "Lotus Leaf Bun Bao Bun Happy Belly",
    category: "japanese",
    form: "Frozen buns",
    blurb:
      "Folded bao buns that steam up soft and even, ready to fill and serve in minutes.",
  },
  {
    slug: "fillo-pastry-sheets-antoniou",
    name: "Fillo Pastry Sheets Antoniou",
    category: "japanese",
    form: "Frozen sheets",
    blurb:
      "Fine fillo sheets from Antoniou, thin enough to layer without tearing across a full tray.",
  },
  {
    slug: "kataifi-pastry-antoniou",
    name: "Kataifi Pastry Antoniou",
    category: "japanese",
    form: "Frozen shredded pastry",
    blurb:
      "Shredded kataifi for nests, crusts and the crisp texture behind modern Middle Eastern desserts.",
  },
  {
    slug: "chuka-wakame",
    name: "Chuka Wakame",
    category: "japanese",
    form: "Seasoned frozen salad",
    blurb:
      "Seasoned seaweed salad, ready to portion straight from thaw for sushi counters and set menus.",
  },
  {
    slug: "wasabi-paste-505",
    name: "Wasabi Paste 505",
    category: "japanese",
    form: "Paste, tube",
    blurb:
      "Consistent, sharp wasabi paste for sushi service where every plate should taste the same.",
  },
  {
    slug: "edamame-whole-soyabean",
    name: "Edamame Whole (Soyabean)",
    category: "japanese",
    form: "Whole pods, frozen",
    blurb:
      "Whole edamame pods — a fast, dependable bar snack that needs nothing but salt and heat.",
  },
  {
    slug: "edamame-peeled-soyabean",
    name: "Edamame Peeled (Soyabean)",
    category: "japanese",
    form: "Peeled beans, frozen",
    blurb:
      "Peeled edamame beans, ready for salads, purées and rice dishes with no podding labour.",
  },
  {
    slug: "lotusroot-sliced-frozen",
    name: "Lotusroot Sliced Frozen",
    category: "japanese",
    form: "Sliced, frozen",
    blurb:
      "Pre-sliced lotus root at an even thickness — consistent crisps and garnish without prep time.",
  },
  {
    slug: "frozen-avocado-halves",
    name: "Frozen Avocado Halves",
    category: "japanese",
    form: "Halves, frozen",
    blurb:
      "Peeled, stoned avocado halves that take seasonality and wastage out of the equation.",
  },
  {
    slug: "frozen-avocado-pulp",
    name: "Frozen Avocado Pulp",
    category: "japanese",
    form: "Pulp, frozen",
    blurb:
      "Ready avocado pulp for guacamole, dressings and high-volume brunch service.",
  },

  /* ── Frozen seafood ─────────────────────────────────────────────────────── */
  {
    slug: "norwegian-salmon-fillet-atlantic",
    name: "Norwegian Salmon Fillet Atlantic",
    category: "seafood",
    form: "Whole fillet",
    blurb:
      "Norwegian Atlantic salmon fillets with even fat marbling, portioned to your own weights.",
  },
  {
    slug: "norwegian-smoked-salmon-presliced",
    name: "Norwegian Smoked Salmon Presliced",
    category: "seafood",
    form: "Pre-sliced, interleaved",
    blurb:
      "Cold-smoked and pre-sliced, so breakfast and banquet service plates at speed with no trim loss.",
  },
  {
    slug: "hamachi-fillet",
    name: "Hamachi Fillet",
    category: "seafood",
    form: "Whole fillet",
    blurb:
      "Yellowtail fillet with the clean, buttery texture sashimi and crudo service depends on.",
  },
  {
    slug: "tuna-saku",
    name: "Tuna Saku",
    category: "seafood",
    form: "Saku block",
    blurb:
      "Trimmed saku blocks that slice square and even — minimal waste per cover.",
  },
  {
    slug: "black-cod-whole",
    name: "Black Cod Whole",
    category: "seafood",
    form: "Whole fish",
    blurb:
      "Whole black cod, rich enough to carry a miso marinade and forgiving under heat.",
  },
  {
    slug: "chilean-seabass-whole",
    name: "Chilean Seabass Whole",
    category: "seafood",
    form: "Whole fish",
    blurb:
      "Whole Chilean seabass with dense white flakes — a premium main that holds on a pass.",
  },
  {
    slug: "soft-shell-crab",
    name: "Soft Shell Crab",
    category: "seafood",
    form: "Whole, cleaned",
    blurb:
      "Cleaned soft shell crab, ready to batter and fry whole for rolls and small plates.",
  },
  {
    slug: "crab-meat",
    name: "Crab Meat",
    category: "seafood",
    form: "Picked meat",
    blurb:
      "Picked crab meat that saves hours of shell work in salads, cakes and rolls.",
  },
  {
    slug: "crabstick",
    name: "Crabstick",
    category: "seafood",
    form: "Sticks, frozen",
    blurb:
      "Consistent surimi sticks for volume sushi, salads and buffet lines.",
  },
  {
    slug: "orange-tobikko-japanese",
    name: "Orange Tobikko Japanese",
    category: "seafood",
    form: "Roe, frozen",
    blurb:
      "Classic orange flying fish roe — the crunch and gloss expected on a sushi counter.",
  },
  {
    slug: "black-tobikko-japanese",
    name: "Black Tobikko Japanese",
    category: "seafood",
    form: "Roe, frozen",
    blurb:
      "Squid-ink black tobikko for contrast against pale rice and white fish.",
  },
  {
    slug: "green-tobikko-japanese",
    name: "Green Tobikko Japanese",
    category: "seafood",
    form: "Roe, frozen",
    blurb:
      "Wasabi-green tobikko, adding colour and a light heat to rolls and canapés.",
  }
);

export const products: Product[] = seeds.map(define);

/** The Breadberry Co. signature line — berries and purees. */
export const signatureProducts = products.filter(
  (product) => product.category === "iqf" || product.category === "puree"
);

export const featuredProducts = signatureProducts.slice(0, 4);

/**
 * Hand-picked Breadberry specialties to highlight on the catalogue hero.
 * These are the "difficult to source" items Breadberry is known for among chefs.
 */
const highlightSlugs = [
  "lotusroot-thai",
  "lotusroot-sliced-frozen",
  "edamame-whole-soyabean",
  "edamame-peeled-soyabean",
] as const;

export const highlightedProducts = highlightSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is Product => !!p);

/** Same-category lines first, topped up from the rest of the catalogue. */
export function relatedProducts(product: Product, count = 4): Product[] {
  const others = products.filter((item) => item.slug !== product.slug);
  const sameCategory = others.filter(
    (item) => item.category === product.category
  );
  const rest = others.filter((item) => item.category !== product.category);
  return [...sameCategory, ...rest].slice(0, count);
}
