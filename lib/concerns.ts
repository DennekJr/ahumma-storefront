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
  /** Null when no lifestyle shot exists; the tile uses a product cover. */
  image: string | null;
  alt: string;
  consultationLabels: string[];
};

export const ALL_CONCERN = "all";

export const CONCERNS: Concern[] = [
  {
    id: "dry-skin",
    label: "Dry skin",
    match: ["sika", "sike", "dream"],
    image: "/images/dream-texture.jpg",
    alt: "Dream Whip body butter held by a model",
    consultationLabels: ["Dry skin", "Very dry skin"],
  },
  {
    id: "dull-uneven",
    label: "Dull & uneven tone",
    match: ["sika", "sike"],
    image: "/images/sika-texture.jpg",
    alt: "Whipped Sika body butter, jar open",
    consultationLabels: ["Dull-looking skin", "Uneven-looking skin tone"],
  },
  {
    id: "everyday-softness",
    label: "Everyday softness",
    match: ["dream"],
    image: "/images/skin-closeup.jpg",
    alt: "Skin after the Ahumma ritual",
    consultationLabels: ["Not sure what my skin needs"],
  },
  {
    // The only concern with no shot of its own — Baby Bloom was never part of
    // the lifestyle shoot, so the tile falls back to the product's own cover.
    id: "delicate-skin",
    label: "Delicate & baby skin",
    match: ["baby"],
    image: null,
    alt: "Baby Bloom, for delicate skin",
    consultationLabels: ["Shopping for a baby or child"],
  },
  {
    id: "cleansing",
    label: "Cleansing",
    match: ["ara"],
    image: "/images/ara-ritual.jpg",
    alt: "Ara African black soap against skin",
    consultationLabels: ["Body acne or congestion"],
  },
];

/** The leading tile, mirroring Aritzia's "All Jackets & Coats". */
export const ALL_TILE = {
  id: ALL_CONCERN,
  label: "Everything",
  image: "/images/sika-ritual.jpg",
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
  alt: string;
}[] = [
  {
    match: ["sika", "sike"],
    portrait: "/images/sika-ritual.jpg",
    wide: "/images/sika-texture.jpg",
    alt: "Sika body butter held by a model",
  },
  {
    match: ["dream"],
    portrait: "/images/dream-texture.jpg",
    wide: "/images/dream-whip.jpg",
    alt: "Dream Whip body butter held by a model",
  },
  {
    match: ["ara"],
    portrait: "/images/ara-ritual.jpg",
    wide: "/images/ara-soap.jpg",
    alt: "Ara African black soap against skin",
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

/** Tile art, falling back to the cover of whichever product the concern matches. */
export function concernImage(
  concern: Concern,
  products: ProductSummary[],
): string | null {
  if (concern.image) return concern.image;

  const match = products.find((product) =>
    concern.match.some((fragment) =>
      product.name.toLowerCase().includes(fragment),
    ),
  );

  return match?.coverUrl ?? null;
}
