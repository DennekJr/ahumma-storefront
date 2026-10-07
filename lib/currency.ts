import type { StoreCurrency } from "@/lib/format";

/**
 * Which currency a visitor starts in.
 *
 * An explicit choice wins: the toggle writes CURRENCY_COOKIE, and the server
 * honours it so the page arrives in that currency. Without one, Nigeria gets
 * naira and everywhere else gets dollars — the store sells in those two, so a
 * shopper in Canada or the UK sees dollars rather than naira.
 *
 * It is a cookie, not localStorage, because the server has to read it: prices
 * are rendered on the server, and a choice the server cannot see would show a
 * flash of the wrong currency before the page corrected itself.
 */
export const CURRENCY_COOKIE = "ahumma-currency";
const ONE_YEAR = 60 * 60 * 24 * 365;

/** Vercel's two-letter country for the visitor, or null when there is none (local dev). */
export function currencyForCountry(country: string | null | undefined): StoreCurrency {
  if (!country) return "NGN";
  return country.toUpperCase() === "NG" ? "NGN" : "USD";
}

export function initialCurrency(
  choice: string | null | undefined,
  country: string | null | undefined,
): StoreCurrency {
  if (choice === "NGN" || choice === "USD") return choice;
  return currencyForCountry(country);
}

/** Records an explicit choice. Only the toggle calls this — a default is not a choice. */
export function rememberCurrencyChoice(currency: StoreCurrency) {
  const secure = window.location.protocol === "https:" ? "; secure" : "";
  document.cookie = `${CURRENCY_COOKIE}=${currency}; path=/; max-age=${ONE_YEAR}; samesite=lax${secure}`;
}
