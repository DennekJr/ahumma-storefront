import type { StoreCurrency } from "@/lib/format";

/**
 * Which currency a visitor sees.
 *
 * Outside Nigeria it is dollars, always: naira prices are for the Nigerian
 * market, so the toggle is hidden and any earlier naira choice is ignored.
 * In Nigeria an explicit choice wins — the toggle writes CURRENCY_COOKIE and
 * the server honours it so the page arrives in that currency — and naira is
 * the default.
 *
 * The country comes from the visitor's IP (Vercel sets it on every request),
 * not the browser's location prompt: it needs no permission, is known before
 * the first byte is rendered, and country is all the currency needs.
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

/**
 * True for a visitor placed outside Nigeria, who only ever sees dollars. With
 * no country (local dev, or a request Vercel could not place) nothing is
 * locked and the visitor is treated as being in Nigeria, as before.
 */
export function currencyIsLocked(country: string | null | undefined): boolean {
  return Boolean(country) && country!.toUpperCase() !== "NG";
}

export function initialCurrency(
  choice: string | null | undefined,
  country: string | null | undefined,
): StoreCurrency {
  if (currencyIsLocked(country)) return "USD";
  if (choice === "NGN" || choice === "USD") return choice;
  return currencyForCountry(country);
}

/** Records an explicit choice. Only the toggle calls this — a default is not a choice. */
export function rememberCurrencyChoice(currency: StoreCurrency) {
  const secure = window.location.protocol === "https:" ? "; secure" : "";
  document.cookie = `${CURRENCY_COOKIE}=${currency}; path=/; max-age=${ONE_YEAR}; samesite=lax${secure}`;
}
