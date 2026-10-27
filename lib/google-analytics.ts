/**
 * Google Analytics 4.
 *
 * The measurement id is public by design — it ships in the page — so it lives
 * here rather than in a secret. `NEXT_PUBLIC_GA_MEASUREMENT_ID` overrides it
 * when a deployment should report into a different property.
 */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-3XNLVCKDHC";
