# Ahumma Product Discovery Audit

## Current experience

Inspected:

- `app/shop/page.tsx`
- `app/shop/[category]/page.tsx`
- `components/concern-rail.tsx`
- `components/collection-card.tsx`
- `components/product-card.tsx`
- `components/filter-bar.tsx`
- `lib/concerns.ts`
- `lib/shop-filters.ts`
- `lib/frontdesk.ts`

Ahumma currently provides:

- A server-rendered `/shop` collection.
- Shareable concern URLs such as `/shop?concern=dry-skin`.
- Visual concern tiles with selected-state styling.
- Size, type, and price filters.
- Sort behavior.
- Product counts and empty states.
- Product cards with image, status, price, quick add, and product detail route.
- Editorial imagery inside the collection grid.
- Category routes for body care, Sika, Dream Whip, Baby Bloom, and Ara.
- Structured ItemList and breadcrumb data.
- Preview-safe demo products while Frontdesk keys are unavailable.

## Reference comparison

### Arami — verified

Arami makes bestsellers and shop-by-concern discovery visible early, uses product cards that clarify variants and shopping actions, and supports broader discovery through gifting, travel sets, ingredient index, and service utilities.

### Aesop — not verified

Direct fetch remained blocked by Cloudflare. No Aesop-specific shop behavior is used as evidence here.

## Findings

### Keep

1. **Concern-led discovery.** This is the strongest match for Ahumma's small catalogue and now connects to consultation.
2. **Server-rendered filter URLs.** They are shareable, crawlable, and work before hydration.
3. **Editorial breaks.** They give the grid a sensory pause without taking the customer away from shopping.
4. **Quick add and detail routes.** Customers can either act quickly or read more.
5. **Explicit preview and unavailable states.** The storefront does not pretend demo data is live inventory.

### Improve next

1. **Product card context.** Add a short tagline only when structured catalogue data provides one. Do not use demo-only copy for live products.
2. **Collection framing.** Consider a verified bestseller label or ordered collection only when Frontdesk exposes the relevant signal.
3. **Concern copy.** Make each concern label map to a concise customer need and keep its product membership data-backed.
4. **Filter visibility.** Test whether the current filter bar is discoverable on mobile after the concern rail; do not add more filters until the current catalogue needs them.
5. **Ritual pairing entry point.** Keep pairing primarily on product pages, where the customer has already shown product intent.

### Do not add yet

- Search without a real product/content index.
- “Bestseller” claims without sales or merchant-curated data.
- Ratings or review counts without a trusted review source.
- Gift, travel-set, refill, pickup, or stockist filters without operational support.
- More concern categories just to make the rail look fuller.

## Recommended discovery model

### Primary path

1. Hero or header CTA sends customers to `/shop`.
2. Shop header explains the collection in one short paragraph.
3. Concern rail helps customers choose by need.
4. Consultation prompt supports uncertain customers.
5. Filters refine a real choice.
6. Product cards answer what the product is and provide Add to Bag or detail access.
7. Product detail pages provide sensory education and curated ritual pairings.

### Concern rules

- Every concern must have at least one supported product match.
- Every concern should have a consultation mapping or use the generic “not sure” route.
- A concern must not imply a medical diagnosis or guaranteed result.
- Images should show the product or a relevant skin/care context, not decorative filler.
- Selected state must remain visible when filters or query parameters change.

## Analytics to consider

Only add events if the analytics destination is configured:

- `shop_viewed`
- `concern_selected` with concern id
- `shop_filter_applied` with filter type
- `shop_sort_changed`
- `product_card_viewed`
- `product_quick_added`
- `consultation_started_from_concern`
- `ritual_pairing_clicked`

Do not send skin concerns or consultation answers as analytics properties.

## Acceptance criteria for future discovery work

- Product data remains authoritative for name, price, stock, variants, and claims.
- Live catalogue pages never show preview-only taglines or prices.
- Concern URLs remain shareable and server-rendered.
- Mobile customers can select a concern, filter, open a product, and add it to the bag without hidden controls.
- Consultation links preserve the selected concern without asking the customer to repeat it.
- Empty, unavailable, and no-match states explain what to do next.
- New features do not make the catalogue look larger or more mature than it is.

## Status

- [x] Current shop and discovery inventory.
- [x] Arami comparison.
- [x] Aesop access limitation documented.
- [x] Concern-to-consultation route implemented.
- [x] Data-backed pairing route implemented on product pages.
- [x] Unsupported catalogue features deferred.
- [ ] Add structured live-product taglines if Frontdesk exposes them.
- [ ] Add analytics only after the destination is confirmed.
