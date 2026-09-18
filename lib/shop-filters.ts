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
export type FacetOption = { value: string; label: string; count: number };
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

const TYPE_RULES: { value: string; label: string; test: (name: string) => boolean }[] = [
  { value: "black-soap", label: "Black soap", test: (n) => n.includes("ara") || n.includes("soap") },
  { value: "baby", label: "Baby care", test: (n) => n.includes("baby") || n.includes("bloom") },
  { value: "body-butter", label: "Body butter", test: () => true },
];

export function typeOf(product: ProductSummary) {
  const name = product.name.toLowerCase();
  return TYPE_RULES.find((rule) => rule.test(name)) ?? TYPE_RULES[TYPE_RULES.length - 1];
}

const PRICE_BANDS = [
  { value: "under-25k", label: "Under ₦25,000", min: 0, max: 2_500_000 },
  { value: "25k-35k", label: "₦25,000 – ₦35,000", min: 2_500_000, max: 3_500_000 },
  { value: "over-35k", label: "Over ₦35,000", min: 3_500_000, max: Infinity },
];

export function priceBandOf(product: ProductSummary) {
  return PRICE_BANDS.find(
    (band) => product.priceMinorFrom >= band.min && product.priceMinorFrom < band.max,
  );
}

function tally(
  products: ProductSummary[],
  key: (p: ProductSummary) => { value: string; label: string } | null | undefined,
): FacetOption[] {
  const counts = new Map<string, FacetOption>();

  for (const product of products) {
    const entry = key(product);
    if (!entry) continue;
    const existing = counts.get(entry.value);
    if (existing) existing.count += 1;
    else counts.set(entry.value, { ...entry, count: 1 });
  }

  return [...counts.values()].sort((a, b) => a.label.localeCompare(b.label));
}

export function buildFacets(
  products: ProductSummary[],
  active: Record<string, string[]> = {},
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
      options: tally(products, (p) => {
        const band = priceBandOf(p);
        return band ? { value: band.value, label: band.label } : null;
      }),
    },
  ];

  // A facet that cannot narrow anything is a control that does nothing — but a
  // facet the shopper has already chosen from must stay on screen, or an active
  // filter becomes invisible and the empty grid has no visible cause.
  return facets.filter(
    (facet) => facet.options.length > 1 || active[facet.id]?.length,
  );
}

export function applyFilters(products: ProductSummary[], query: ShopQuery) {
  return products.filter((product) => {
    if (query.size?.length) {
      const size = sizeOf(product);
      if (!size || !query.size.includes(size)) return false;
    }
    if (query.type?.length && !query.type.includes(typeOf(product).value)) {
      return false;
    }
    if (query.price?.length) {
      const band = priceBandOf(product);
      if (!band || !query.price.includes(band.value)) return false;
    }

    return true;
  });
}

export function applySort(products: ProductSummary[], sort: string | undefined) {
  const sorted = [...products];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.priceMinorFrom - b.priceMinorFrom);
    case "price-desc":
      return sorted.sort((a, b) => b.priceMinorFrom - a.priceMinorFrom);
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.updatedAt ?? 0).getTime() - new Date(a.updatedAt ?? 0).getTime(),
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
    (query.size?.length ?? 0) + (query.type?.length ?? 0) + (query.price?.length ?? 0)
  );
}
