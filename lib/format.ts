import type { ProductPrice, ProductSummary } from "@/lib/store-types";

export const STORE_CURRENCIES = ["NGN", "USD"] as const;
export type StoreCurrency = (typeof STORE_CURRENCIES)[number];

export function isStoreCurrency(value: string | null): value is StoreCurrency {
  return STORE_CURRENCIES.some((currency) => currency === value);
}

export function resolvePrice(
  priceMinor: number,
  currency: string,
  prices: ProductPrice[] | undefined,
  preferredCurrency: StoreCurrency,
): ProductPrice {
  if (currency === preferredCurrency) {
    return { currency, priceMinor };
  }

  return (
    prices?.find((price) => price.currency === preferredCurrency) ?? {
      currency,
      priceMinor,
    }
  );
}

export function resolveSummaryPrice(
  product: ProductSummary,
  preferredCurrency: StoreCurrency,
): ProductPrice {
  if (product.currency === preferredCurrency) {
    return {
      currency: product.currency,
      priceMinor: product.priceMinorFrom,
      compareAtMinor: product.compareAtMinorFrom,
    };
  }

  const priceMinor = product.pricesFrom?.[preferredCurrency];
  if (typeof priceMinor === "number") {
    return {
      currency: preferredCurrency,
      priceMinor,
      compareAtMinor: product.compareAtFrom?.[preferredCurrency] ?? null,
    };
  }

  return {
    currency: product.currency,
    priceMinor: product.priceMinorFrom,
    compareAtMinor: product.compareAtMinorFrom,
  };
}

export function formatMoney(amountMinor: number, currency = "NGN") {
  return new Intl.NumberFormat(currency === "USD" ? "en-US" : "en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "NGN" ? 0 : 2,
  }).format(amountMinor / 100);
}
