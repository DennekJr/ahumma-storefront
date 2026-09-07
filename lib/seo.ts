/**
 * Whether this deployment may be indexed by search engines.
 *
 * ahumma.com is the live brand site; this storefront currently deploys to
 * ahumma.net for testing. Two indexable sites carrying the same brand copy
 * compete with each other and split the brand's search authority, so indexing
 * is OFF unless a deployment explicitly opts in.
 *
 * Defaulting to "no" is deliberate: a new preview or staging environment
 * should never have to remember to exclude itself.
 */
export function indexingAllowed() {
  return process.env.AHUMMA_ALLOW_INDEXING === "true";
}
