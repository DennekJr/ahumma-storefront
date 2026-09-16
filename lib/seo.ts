import { siteUrl } from "@/lib/structured-data";

/** The one hostname whose pages should appear in search results. */
const CANONICAL_HOST = "www.ahumma.com";

/**
 * Whether this deployment may be indexed by search engines.
 *
 * This storefront serves ahumma.com, which is the site that should rank.
 * Older deployments (ahumma.net) and every Vercel preview carry the same brand
 * copy, and two indexable copies compete with each other and split the brand's
 * search authority — so indexing is OFF unless a deployment opts in.
 *
 * Defaulting to "no" is deliberate: a new preview or staging environment
 * should never have to remember to exclude itself. Production is recognised
 * on its own, so the live shop cannot be hidden by a missing variable;
 * AHUMMA_ALLOW_INDEXING remains as an explicit override.
 */
export function indexingAllowed() {
  if (process.env.AHUMMA_ALLOW_INDEXING === "true") return true;

  // A forgotten environment variable silently served `Disallow: /` from the
  // live shop, so production no longer depends on one being remembered. Both
  // halves are required: VERCEL_ENV rules out previews, and the host check
  // rules out any other production deployment of this same code.
  if (process.env.VERCEL_ENV !== "production") return false;

  try {
    return new URL(siteUrl()).hostname === CANONICAL_HOST;
  } catch {
    return false;
  }
}
