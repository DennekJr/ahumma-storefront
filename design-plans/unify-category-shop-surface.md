# Unify category pages with the main shop surface

Written against: `c0402b2c08210d60c727e620268d5b19de395175`

## Evidence chain

- Surface: `/shop/[category]`
- Problem: Category pages use a separate `shop-hero` + `ProductCard` composition, while `/shop` uses `collection-head`, `ConcernRail`, `FilterBar`, `CollectionCard`, and editorial interruptions. The two routes therefore present the same product-browsing task through different visual and interaction systems.
- Design evidence: `AHUMMA-DESIGN-SYSTEM-AUDIT.md` documents serif editorial storytelling, clear product discovery, packshots paired with ritual/lifestyle media, and reusable brand roles. The main `/shop` route is the current implementation exemplar.
- Owner: `app/shop/page.tsx`, `app/shop/[category]/page.tsx`, `components/concern-rail.tsx`, `components/filter-bar.tsx`, `components/collection-card.tsx`, `app/globals.css`
- Scope and affected surfaces: `/shop/[category]` and shared shop presentation styles; `/shop` is the reference surface and should remain behaviorally unchanged.
- Uncertainty: Confirm category URL behavior and category-to-concern mapping during implementation; the existing category slugs and query-based concern filters are not currently the same model.

## Design decision

Make `/shop/[category]` render through the same collection browsing composition as `/shop`: `collection-head`, the concern rail with the active category state represented, the shared filter bar, `CollectionCard`, and the same grid spacing. Preserve each category’s existing title, description, server-side product matching, metadata, and back-to-shop affordance. Do not duplicate a second category-only card or hero system.

## Reuse

- `CollectionCard` for product presentation and quick add behavior
- `ConcernRail` for the selected browsing state
- `FilterBar` for shareable URL-driven filtering and sorting
- `collection-head`, `collection-grid`, and related shop tokens in `app/globals.css`
- Exemplar: `app/shop/page.tsx`

No new shared primitive is required.

## Changes

1. `app/shop/[category]/page.tsx`
   - Change: Replace the category-only `shop-hero` and `ProductCard` grid composition with the main shop collection structure, passing the category’s product set into `CollectionCard` and preserving the category title/description in `collection-head`.
   - Preserve: Existing category matchers, category metadata, invalid-category `notFound()` behavior, product links, and empty-state copy.
   - Verify: Each valid category route renders the same header hierarchy, card anatomy, pricing, badges, quick-add behavior, filters, and responsive grid as `/shop`.

2. `app/shop/[category]/page.tsx` and `lib/shop-filters.ts`
   - Change: Reconcile category selection with the existing URL-driven concern/filter model. If a category maps to an existing concern, use the same selected-state URL pattern; otherwise keep the category slug as the route scope and apply size/type/price/sort query parameters within that scope.
   - Preserve: Shareable URLs and server-rendered filtering; do not introduce client-only product filtering.
   - Verify: Selecting a concern, filter, or sort option preserves the category scope and produces the expected product count and result set.

3. `app/globals.css`
   - Change: Remove or stop using category-only `shop-hero`, `shop-group`, and `ProductCard` layout rules for this route where the shared collection styles now own presentation. Add only the minimum category modifier needed for the back-to-shop link or category-specific context.
   - Preserve: Homepage typography, brand color roles, mobile breakpoints, focus states, and the existing `/shop` appearance.
   - Verify: No second category-only visual system remains for the same product-discovery task.

## Scope

- Inherit: All valid category routes under `/shop/[category]`.
- Verify: `/shop`, filtered `/shop` states, category routes with one product, multiple products, no products, sold-out products, and mobile layouts.
- Exclude: Homepage copy, product detail pages, checkout, API behavior, new product data, and editorial imagery changes.

## Validation

- Product: Visit `/shop/bodycare`, `/shop/sika`, `/shop/dream-whip`, `/shop/baby-bloom`, and `/shop/ara-liquid-african-black-soap`; confirm each route keeps its own scope while matching the main shop browsing experience.
- Interface: Check unfiltered, filtered, sorted, empty, and single-result states at desktop and mobile widths; confirm the selected category/concern presentation and back-to-shop link remain clear.
- System: Confirm category pages reuse `CollectionCard`, `ConcernRail`, `FilterBar`, and shared collection tokens; confirm no parallel category card/grid composition remains.
- Repository: `bun run check` → expected to pass.

## Stop conditions

- Stop if category slugs cannot be reconciled with the concern/filter model without changing product data semantics.
- Stop if `CollectionCard` cannot represent a valid category-page product state without changing shared homepage/shop behavior.
- Stop if implementing category filters requires changing API or catalogue contracts outside this surface.

## Design documentation

- After acceptance and validation: record that category and all-products browsing share one collection composition in `AHUMMA-DESIGN-SYSTEM-AUDIT.md`, if the project wants this as a durable design-system decision.
