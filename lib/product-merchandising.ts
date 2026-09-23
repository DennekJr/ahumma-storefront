import type { ProductDetail, ProductSummary } from "@/lib/store-types";

type RitualPairing = {
  productMatches: string[];
  pairedProducts: string[];
  reason: string;
};

export type ProductPairing = {
  product: ProductSummary;
  reason: string;
};

const KNOWN_PRODUCT_INGREDIENTS: Array<{
  productMatches: string[];
  ingredients: string[];
}> = [
  {
    productMatches: ["ara", "black soap"],
    ingredients: [
      "Shea butter",
      "Coconut oil",
      "Palm kernel oil",
      "Cocoa pod ash",
      "African black soap",
    ],
  },
  {
    productMatches: ["dream"],
    ingredients: ["Avocado butter", "Cocoa butter", "Mango butter"],
  },
  {
    productMatches: ["sika"],
    ingredients: ["Shea butter", "Jojoba oil", "CoQ10"],
  },
];

const RITUAL_PAIRINGS: RitualPairing[] = [
  {
    productMatches: ["ara", "black soap"],
    pairedProducts: ["sika", "dream"],
    reason: "Cleanse first, then seal in softness.",
  },
  {
    productMatches: ["sika"],
    pairedProducts: ["ara", "dream"],
    reason: "A bright, everyday finish after a considered cleanse.",
  },
  {
    productMatches: ["dream"],
    pairedProducts: ["ara", "sika"],
    reason: "A slow, nourishing finish for after the shower.",
  },
];

function productText(product: ProductSummary) {
  return `${product.name} ${product.slug}`.toLowerCase();
}

export function getProductIngredients(product: ProductDetail) {
  if (product.info?.ingredients?.length) return product.info.ingredients;

  const fallback = KNOWN_PRODUCT_INGREDIENTS.find((entry) =>
    entry.productMatches.some((match) => productText(product).includes(match)),
  );

  return fallback?.ingredients ?? [];
}

export function getRitualPairings(
  product: ProductSummary,
  products: ProductSummary[],
): ProductPairing[] {
  const pairing = RITUAL_PAIRINGS.find((entry) =>
    entry.productMatches.some((match) => productText(product).includes(match)),
  );

  if (!pairing) return [];

  return pairing.pairedProducts.flatMap((match) => {
    const pairedProduct = products.find((candidate) =>
      productText(candidate).includes(match),
    );

    return pairedProduct && pairedProduct.ref !== product.ref
      ? [{ product: pairedProduct, reason: pairing.reason }]
      : [];
  });
}
