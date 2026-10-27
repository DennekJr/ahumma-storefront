/**
 * Meta (Facebook) Pixel.
 *
 * The id is public by design — it ships inside the page and is readable by
 * anyone — so it lives here rather than in a secret. `NEXT_PUBLIC_META_PIXEL_ID`
 * overrides it when a deployment needs to report into a different ad account.
 */
export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "1737068550890441";
