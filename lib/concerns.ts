import type { ProductSummary } from "@/lib/store-types";

/**
 * Shop-by-concern taxonomy.
 *
 * Aritzia's collection page leads with a rail of visual sub-categories, which
 * is what makes a 182-item grid navigable. Ahumma has four products, so
 * sub-categories would be navigation without a destination. Concerns do the
 * same job honestly: they answer "which one is for me", which is the question
 * a four-product range actually provokes.
 *
 * Every concern below is drawn from the brand's own product copy — nothing here
 * claims a benefit the descriptions do not already make.
 */
export type Concern = {
  id: string;
  label: string;
  /** Names to match against the live catalogue. Slugs have changed before. */
  match: string[];

  alt: string;
  image: string;
  consultationLabels: string[];
};

export const ALL_CONCERN = "all";

export const CONCERNS: Concern[] = [
  {
    id: "dry-skin",
    label: "Dry skin",
    match: ["sika", "sike", "dream"],

    alt: "Dream Whip body butter held by a model",
    image: "/images/dry-skin.jpg",
    consultationLabels: ["Dry skin", "Very dry skin"],
  },
  {
    id: "dull-uneven",
    label: "Dull & uneven tone",
    match: ["sika", "sike"],

    alt: "Whipped Sika body butter, jar open",
    image: "/images/dull-uneven.jpg",
    consultationLabels: ["Dull-looking skin", "Uneven-looking skin tone"],
  },
  {
    id: "everyday-softness",
    label: "Everyday softness",
    match: ["dream"],

    alt: "Skin after the Ahumma ritual",
    image: "/images/everyday-softness.jpg",
    consultationLabels: ["Not sure what my skin needs"],
  },
  {
    id: "delicate-skin",
    label: "Delicate & baby skin",
    match: ["baby"],

    alt: "Baby Bloom, for delicate skin",
    image: "/images/delicate-skin.jpg",
    consultationLabels: ["Shopping for a baby or child"],
  },
  {
    id: "cleansing",
    label: "Cleansing",
    match: ["ara"],

    alt: "Ara African black soap against skin",
    image: "/images/cleansing.jpg",
    consultationLabels: ["Body acne or congestion"],
  },
];

/** The leading tile, mirroring Aritzia's "All Jackets & Coats". */
export const ALL_TILE = {
  id: ALL_CONCERN,
  label: "Everything",
  image: "/images/everything.jpg",
  alt: "Sika body butter held by a model",
  consultationLabels: [],
};

export function findConcern(id: string | undefined): Concern | null {
  if (!id || id === ALL_CONCERN) return null;
  return CONCERNS.find((concern) => concern.id === id) ?? null;
}

export function filterByConcern(
  products: ProductSummary[],
  concern: Concern | null,
) {
  if (!concern) return products;

  return products.filter((product) => {
    const name = product.name.toLowerCase();
    return concern.match.some((fragment) => name.includes(fragment));
  });
}

/**
 * Editorial imagery keyed by product name fragment, used for the break rows and
 * for filling a trailing gap in the grid. Frontdesk holds packshots; these are
 * the model and texture shots that give the page its rhythm.
 */
const EDITORIAL: {
  match: string[];
  portrait: string;
  wide: string;
  /** A 4:5 shot of the product in hand, closing the product page's strip. */
  inHand: string;
  alt: string;
  /** Where to anchor the wide photo when its frame crops it. */
  widePosition?: string;
}[] = [
  {
    match: ["sika", "sike"],
    portrait: "/images/label-sika.jpg",
    wide: "/images/sika-texture.jpg",
    inHand: "/images/in-hand-sika.jpg",
    alt: "Sika body butter on a stone plinth",
  },
  {
    match: ["dream"],
    portrait: "/images/label-dream-whip.jpg",
    wide: "/images/dream-whip.jpg",
    inHand: "/images/in-hand-dream-whip.jpg",
    alt: "Dream Whip body butter on a stone plinth",
  },
  {
    match: ["ara"],
    portrait: "/images/ara-soap.jpg",
    wide: "/images/ara-ritual.jpg",
    inHand: "/images/cleansing.jpg",
    alt: "Ara African black soap on a stone counter",
    // The bottle is on the left of this very wide shot.
    widePosition: "left center",
  },
];

export function editorialFor(product: ProductSummary | undefined) {
  if (!product) return null;
  const name = product.name.toLowerCase();
  return (
    EDITORIAL.find((entry) => entry.match.some((m) => name.includes(m))) ?? null
  );
}

/** The first product with editorial art, for the collection grid's break row. */
export function firstEditorialProduct(products: ProductSummary[]) {
  return products.find((product) => editorialFor(product)) ?? undefined;
}

/**
 * The next product with editorial art after `currentRef`, wrapping around.
 *
 * A product page's break row is a way out to something else, so it never shows
 * the product already on screen. Walking from the current product rather than
 * taking the first match also stops every page cross-selling the same one:
 * each lands on a different neighbour, and products without art are skipped.
 */
export function nextEditorialProduct(
  products: ProductSummary[],
  currentRef: string,
) {
  const start = products.findIndex((product) => product.ref === currentRef);
  if (start < 0) return firstEditorialProduct(products);

  for (let step = 1; step <= products.length; step += 1) {
    const candidate = products[(start + step) % products.length];
    if (candidate.ref !== currentRef && editorialFor(candidate))
      return candidate;
  }

  return undefined;
}

export function randomConcernImages(products: ProductSummary[]) {
  return Object.fromEntries(
    CONCERNS.map((concern) => {
      return [concern.id, concern.image];
    }),
  );
}
