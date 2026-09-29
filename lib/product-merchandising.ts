import { INGREDIENT_STORY } from "@/lib/homepage";
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
    reason: "Follow your cleanse with a nourishing body butter.",
  },
  {
    productMatches: ["sika"],
    pairedProducts: ["ara", "dream"],
    reason: "Start with a gentle cleanse or finish with richer moisture.",
  },
  {
    productMatches: ["dream"],
    pairedProducts: ["ara", "sika"],
    reason: "Pair with a gentle cleanse or a lighter layer for everyday care.",
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

export function getProductStoryCopy(product: ProductDetail) {
  const ingredients = getProductIngredients(product);

  if (ingredients.length) {
    const ingredientList = new Intl.ListFormat("en", {
      style: "long",
      type: "conjunction",
    }).format(ingredients);

    return {
      summary: `A thoughtful blend of ${ingredientList}.`,
      ingredients: ingredients.map((name) => ({
        name,
        description: INGREDIENT_STORY.find(
          (entry) => entry.name.toLowerCase() === name.toLowerCase(),
        )?.body,
      })),
    };
  }

  const longDescription = product.info?.longDescription;
  return longDescription && longDescription !== product.description
    ? { summary: longDescription, ingredients: [] }
    : null;
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
