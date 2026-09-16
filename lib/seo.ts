/**
 * Whether this deployment may be indexed by search engines.
 *
 * This storefront serves ahumma.com, which is the site that should rank.
 * Older deployments (ahumma.net) and every Vercel preview carry the same brand
 * copy, and two indexable copies compete with each other and split the brand's
 * search authority — so indexing is OFF unless a deployment opts in.
 *
 * Defaulting to "no" is deliberate: a new preview or staging environment
 * should never have to remember to exclude itself. The consequence is that
 * production must set AHUMMA_ALLOW_INDEXING=true, or ahumma.com serves
 * `Disallow: /` and noindex to every crawler.
 */
export function indexingAllowed() {
  return process.env.AHUMMA_ALLOW_INDEXING === "true";
}
