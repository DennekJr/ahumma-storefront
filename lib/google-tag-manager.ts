/**
 * Google Tag Manager container.
 *
 * The id is public by design — it ships inside the page and is readable by
 * anyone — so it lives here rather than in a secret. `NEXT_PUBLIC_GTM_ID`
 * overrides it when a deployment needs to load a different container.
 */
export const GTM_CONTAINER_ID =
  process.env.NEXT_PUBLIC_GTM_ID?.trim() || "GTM-WB7D54C2";
