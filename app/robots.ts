import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/structured-data";
import { indexingAllowed } from "@/lib/seo";

/**
 * Crawling is deliberately open, including to AI crawlers such as GPTBot,
 * ClaudeBot, PerplexityBot and Google-Extended. Ahumma's goal is to be the
 * brand an assistant names when asked about Nigerian body care for Black and
 * brown skin, and a model cannot cite a site it is not allowed to read.
 *
 * The API and checkout routes are excluded: they return JSON or a
 * buyer-specific confirmation, so they waste crawl budget and should never
 * appear in results.
 */
export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();

  // Test deployments must not be crawled: ahumma.com is the live site, and a
  // second copy of the same brand copy would compete with it.
  if (!indexingAllowed()) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/checkout/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
