import { formatMoneyWhole, type StoreCurrency } from "@/lib/format";
import type { ProductSummary } from "@/lib/store-types";

/**
 * Faceted filtering for the collection page.
 *
 * The reference filters on Size, Length and Colour. Only one of those has an
 * analogue here: Frontdesk returns no colour, no length, and a single variant
 * per product. So the facets below are the ones Ahumma's data can actually
 * answer — size, product type and price — derived rather than invented.
 *
 * Facets are computed from the catalogue instead of hardcoded, so a filter
 * never offers a value that matches nothing, and new products widen the options
 * without a code change.
 */
export type FacetOption = { value: string; label: string };
export type Facet = { id: FacetId; label: string; options: FacetOption[] };
export type FacetId = "size" | "type" | "price";

export type ShopQuery = {
  concern?: string;
  size?: string[];
  type?: string[];
  price?: string[];
  sort?: string;
};

export const SORTS = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "newest", label: "Newest" },
] as const;

export const DEFAULT_SORT = "recommended";

/** Size lives in the product name — "Sika Body Butter (250g)". */
export function sizeOf(product: ProductSummary): string | null {
  const match = product.name.match(/\(([\d.]+\s*(?:g|kg|ml|l|oz))\)/i);
  return match ? match[1].replace(/\s+/g, "").toLowerCase() : null;
}

const TYPE_RULES: {
  value: string;
  label: string;
  test: (name: string) => boolean;
}[] = [
  {
    value: "black-soap",
    label: "Black soap",
    test: (n) => n.includes("ara") || n.includes("soap"),
  },
  {
    value: "baby",
    label: "Baby care",
    test: (n) => n.includes("baby") || n.includes("bloom"),
  },
  { value: "body-butter", label: "Body butter", test: () => true },
];

export function typeOf(product: ProductSummary) {
  const name = product.name.toLowerCase();
  return (
    TYPE_RULES.find((rule) => rule.test(name)) ??
    TYPE_RULES[TYPE_RULES.length - 1]
  );
}

/**
 * Price bands, one set per store currency.
 *
 * These used to be naira-only: a shopper who had switched to dollars saw
 * "Under ₦25,000" above a grid of dollar prices, and the bands were matched
 * against the naira price whatever they had chosen. Each currency now has its
 * own edges, picked as round figures in that currency rather than converted —
 * "Under $20" is how a dollar shopper thinks about price, "Under $23.85" is
 * not, and the store's own USD prices are set independently of the exchange
 * rate anyway (they imply anywhere from ₦1,001 to ₦1,086 per dollar).
 *
 * Values carry their currency, so a band can never be applied against the
 * wrong price, and one left in the URL after the shopper switches currency is
 * simply inert rather than filtering against figures it was not written for.
 *
 * Labels are generated, not written, so there is no symbol to hardcode.
 */
type PriceBand = { value: string; min: number; max: number };

const PRICE_BAND_EDGES: Record<StoreCurrency, number[]> = {
  // Minor units. Two edges make three bands: under, between, over.
  NGN: [2_500_000, 3_500_000],
  USD: [2_000, 3_000],
};

function bandsFor(currency: StoreCurrency): PriceBand[] {
  const [low, high] = PRICE_BAND_EDGES[currency];
  const key = currency.toLowerCase();
  return [
    { value: `${key}-under-${low}`, min: 0, max: low },
    { value: `${key}-${low}-${high}`, min: low, max: high },
    { value: `${key}-over-${high}`, min: high, max: Infinity },
  ];
}

function bandLabel(band: PriceBand, currency: StoreCurrency) {
  if (band.min === 0) return `Under ${formatMoneyWhole(band.max, currency)}`;
  if (band.max === Infinity) return `Over ${formatMoneyWhole(band.min, currency)}`;
  return `${formatMoneyWhole(band.min, currency)} – ${formatMoneyWhole(band.max, currency)}`;
}

/** The currency a band value was written for — "usd-under-2000" is USD. */
export function bandCurrency(value: string): StoreCurrency | null {
  const prefix = value.split("-")[0]?.toUpperCase();
  return prefix === "NGN" || prefix === "USD" ? prefix : null;
}

/**
 * A product's price in exactly this currency, or null.
 *
 * Deliberately stricter than resolveSummaryPrice, which falls back to the
 * native price when a currency is missing. That is right for display and
 * wrong here: a naira price compared against a dollar threshold would put
 * ₦26,200 in "Over $30". A product with no price in a currency belongs to no
 * band in it.
 */
export function priceIn(
  product: ProductSummary,
  currency: StoreCurrency,
): number | null {
  if (product.currency === currency) return product.priceMinorFrom;
  const price = product.pricesFrom?.[currency];
  return typeof price === "number" ? price : null;
}

export function priceBandOf(
  product: ProductSummary,
  currency: StoreCurrency = "NGN",
) {
  const price = priceIn(product, currency);
  if (price === null) return undefined;
  return bandsFor(currency).find((band) => price >= band.min && price < band.max);
}

function tally(
  products: ProductSummary[],
  key: (
    p: ProductSummary,
  ) => { value: string; label: string } | null | undefined,
): FacetOption[] {
  const options = new Map<string, FacetOption>();

  for (const product of products) {
    const entry = key(product);
    if (entry) options.set(entry.value, entry);
  }

  return [...options.values()].sort((a, b) => a.label.localeCompare(b.label));
}

export function buildFacets(
  products: ProductSummary[],
  currency: StoreCurrency = "NGN",
): Facet[] {
  const facets: Facet[] = [
    {
      id: "size",
      label: "Size",
      options: tally(products, (p) => {
        const size = sizeOf(p);
        return size ? { value: size, label: size } : null;
      }),
    },
    {
      id: "type",
      label: "Type",
      options: tally(products, (p) => {
        const type = typeOf(p);
        return { value: type.value, label: type.label };
      }),
    },
    {
      id: "price",
      label: "Price",
      // Bands run low to high. tally sorts alphabetically, which put
      // "₦25,000 – ₦35,000" ahead of "Under ₦25,000" — price order matters
      // more here than any order the labels happen to spell.
      options: tally(products, (p) => {
        const band = priceBandOf(p, currency);
        return band ? { value: band.value, label: bandLabel(band, currency) } : null;
      }).sort(
        (a, b) =>
          bandsFor(currency).findIndex((band) => band.value === a.value) -
          bandsFor(currency).findIndex((band) => band.value === b.value),
      ),
    },
  ];

  return facets;
}

export function applyFilters(
  products: ProductSummary[],
  query: ShopQuery,
  currency: StoreCurrency = "NGN",
) {
  // Bands from another currency are ignored, not applied: after a currency
  // switch they would otherwise filter against prices they were not set for.
  const priceBands =
    query.price?.filter((value) => bandCurrency(value) === currency) ?? [];

  return products.filter((product) => {
    if (query.size?.length) {
      const size = sizeOf(product);
      if (!size || !query.size.includes(size)) return false;
    }
    if (query.type?.length && !query.type.includes(typeOf(product).value)) {
      return false;
    }
    if (priceBands.length) {
      const band = priceBandOf(product, currency);
      if (!band || !priceBands.includes(band.value)) return false;
    }

    return true;
  });
}

export function applySort(
  products: ProductSummary[],
  sort: string | undefined,
  currency: StoreCurrency = "NGN",
) {
  const sorted = [...products];
  // Same defect as the bands: this sorted on the naira price for everyone.
  // Products with no price in the currency sort last rather than as zero.
  const price = (product: ProductSummary) =>
    priceIn(product, currency) ?? Number.POSITIVE_INFINITY;

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => price(a) - price(b));
    case "price-desc":
      return sorted.sort((a, b) => {
        // Unpriced products stay last in both directions.
        const pa = priceIn(a, currency);
        const pb = priceIn(b, currency);
        if (pa === null) return 1;
        if (pb === null) return -1;
        return pb - pa;
      });
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.updatedAt ?? 0).getTime() -
          new Date(a.updatedAt ?? 0).getTime(),
      );
    default:
      // "Recommended" is the merchant's own order, which is how it arrives.
      return sorted;
  }
}

/** A product counts as new for this long after it last changed in Frontdesk. */
const NEW_WINDOW_DAYS = 7;

export function isNew(product: ProductSummary) {
  if (!product.updatedAt) return false;
  const age = Date.now() - new Date(product.updatedAt).getTime();
  return age >= 0 && age < NEW_WINDOW_DAYS * 24 * 60 * 60 * 1000;
}

/** Search params arrive as string | string[]; filters are always multi-select. */
export function toList(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return (Array.isArray(value) ? value : value.split(",")).filter(Boolean);
}

export function countActive(query: ShopQuery) {
  return (
    (query.size?.length ?? 0) +
    (query.type?.length ?? 0) +
    (query.price?.length ?? 0)
  );
}
