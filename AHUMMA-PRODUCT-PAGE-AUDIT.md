# Ahumma Product Page Audit

## Current experience

Inspected `app/products/[slug]/page.tsx`, `components/product-purchase.tsx`, `components/product-description-blocks.tsx`, `components/collection-card.tsx`, `lib/product-details.ts`, `lib/product-merchandising.ts`, and the structured product types in `lib/store-types.ts`.

The product page currently provides:

1. Product gallery with up to four media items.
2. Product status or preorder label.
3. Product name and description.
4. Currency-aware purchase controls.
5. Product highlights.
6. Product story and rich description blocks.
7. Care and origin/sustainability detail cards.
8. Structured detail rows.
9. Ingredient stories when `info.ingredients` is present.
10. Curated ritual pairings based on explicit product relationships.
11. Editorial cross-sell imagery.
12. Related collection cards and a shop route back.
13. Product and breadcrumb structured data.

## Reference comparison

### Arami — verified

Arami's accessible experience emphasizes product repetition, clear variants, everyday use, concern-led discovery, routine context, and a philosophy that makes fewer products feel intentional.

### Aesop — not verified

Direct fetches remained blocked by Cloudflare. No Aesop product-page claim is treated as verified.

## Recommended hierarchy

The existing hierarchy is sound:

1. Product image and status.
2. Product name.
3. Short sensory description.
4. Price and purchase controls.
5. Verified highlights.
6. Care and use.
7. Ingredients and details.
8. Ritual pairing.
9. Editorial context.

The page should not move technical details above the purchase decision or bury the product's sensory character under long copy.

## Implemented improvements

### Structured ingredient stories

`ProductInfo.ingredients` is now an optional structured field. Product pages prefer live catalogue ingredients and use a bounded curated fallback for the three known Ahumma products when Frontdesk metadata is incomplete. Unknown products render no ingredient claims. The About ingredient section links ingredient stories to matching products.

This avoids claiming that every product contains every ingredient in Ahumma's general story. The preview catalogue includes explicit ingredient arrays for Ara, Dream Whip, and Sika, and the fallback mirrors those verified current-product descriptions.

### Ritual pairings

`lib/product-merchandising.ts` defines explicit pairings for Ara, Sika, and Dream Whip. Product pages now use “Build the ritual” instead of showing the first three unrelated products in catalogue order.

Pairings are resolved against current product names and slugs, so live product references do not depend on preview slugs. Products without a configured pairing do not show an invented cross-sell section.

## Copy rules

- Lead with texture, scent, use, and feeling.
- Use only benefits supported by the product data.
- Avoid medical, correction, bleaching, or guaranteed-result claims.
- Keep Nigerian origin and African ingredient context factual.
- Do not use “natural” as a blanket product claim.
- Keep “ritual” tied to a concrete behavior.
- Explain how to use the product in a short, useful instruction.
- Make shipping, returns, and stock information available when the commerce configuration supports it.

## Remaining data dependencies

- Live product ingredient arrays should still be populated in Frontdesk so the fallback can be replaced by the catalogue's source of truth.
- Live product relationships should be reviewed as the catalogue grows; name matching is a safe interim approach for the current small range, not a substitute for merchant-authored relationship data at scale.
- Product reviews should remain absent until a trusted review source is connected.
- Product-specific shipping and returns copy must come from confirmed operations.

## Acceptance criteria

- Add to Bag remains easy to reach on desktop and mobile.
- Prices come from the selected currency and API-provided amounts.
- Product media uses real assets and meaningful alt text.
- Ingredient stories render only from structured product data.
- Ritual pairings are intentional, relevant, and never include the product currently being viewed.
- Empty relationship states do not show generic recommendations.
- Unsupported claims are not introduced by editorial copy.
- Product detail and purchase errors remain clear and recoverable.

## Status

- [x] Product-page hierarchy reviewed.
- [x] Ingredient data boundary added.
- [x] Ingredient story component added.
- [x] About-to-product ingredient links added.
- [x] Curated ritual pairing system added.
- [x] Generic product-page cross-sell removed.
- [x] Aesop access limitation documented.
- [ ] Populate and verify live ingredient data; curated fallbacks cover the current known range meanwhile.
- [ ] Review relationship data once live catalogue expands.
