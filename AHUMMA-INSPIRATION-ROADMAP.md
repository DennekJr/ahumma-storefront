# Ahumma Inspiration Implementation Roadmap

## Completed work

- Homepage hero direction and copy.
- Homepage narrative and media improvements.
- Navigation, menu, popup, focus, and responsive fixes.
- Footer-primary newsletter plus separate popup.
- Consultation flow.
- About and ingredient storytelling.
- Concern-to-consultation connection.
- Structured ingredient stories with bounded known-product fallbacks.
- Intentional product-page ritual pairings.
- Product discovery, story, utility, retention, and design audits.

## Priority 1 — complete or verify before launch

### 1. Replace broken Help links

**Evidence:** `AHUMMA-UTILITY-AUDIT.md` confirms the current external Contact, Delivery, Returns, and Privacy URLs return 404.

**Required decision:** Use verified internal/canonical destinations or create the missing pages with approved legal and support content.

**File:** `components/site-footer.tsx`

### 2. Confirm newsletter consent and unsubscribe requirements

**Evidence:** `AHUMMA-RETENTION-AUDIT.md`.

**Required decision:** Confirm Frontdesk/email-provider behavior and applicable market requirements before adding or changing consent copy.

**Files:** `components/circle-signup.tsx`, `app/api/subscribe/route.ts`

### 3. Confirm live product metadata

**Evidence:** Product pages use bounded fallbacks only for the known current range.

**Required work:** Populate and verify `info.ingredients` and future product relationship data in Frontdesk.

**Files:** `lib/store-types.ts`, `lib/product-merchandising.ts`, `app/products/[slug]/page.tsx`

### 4. Run browser-based visual QA

**Required viewports:** 1440px, 1024px, 768px, 430px, and 390px.

**Required flows:** homepage, concern route, consultation prefill, product ingredient block, ritual pairings, newsletter footer, popup suppression, menu, bag, and checkout preview.

## Priority 2 — implement when data is ready

- Add structured live-product taglines to cards.
- Add merchant-curated bestseller/newness signals.
- Add data-backed ritual relationships for an expanding catalogue.
- Add welcome or replenishment email sequences.
- Add verified delivery messaging and destinations.
- Add owned routine/lifestyle video with mobile fallback.

## Priority 3 — test later

- Search after a meaningful product/content index exists.
- Standalone ingredient index after enough verified ingredient content exists.
- Gifting, sets, travel sets, and gift cards after fulfilment rules are confirmed.
- Product reviews after a trusted review source and consent process are connected.
- Stockists or click and collect after inventory and location data are available.
- Journal/editorial route after a sustainable publishing cadence exists.

## Do not pursue yet

- Refill/reuse claims without a real program.
- A loyalty system without repeat-purchase and ownership support.
- Aesop-specific visual or copy imitation while direct inspection is unavailable.
- More popups or overlapping newsletter surfaces.
- Medical, correction, bleaching, or universal-skin claims.

## Regression checklist

- Approved hero copy and cloud/sky background remain intact.
- Black and brown skin positioning remains specific.
- Footer newsletter remains primary.
- Popup remains separate and respects suppression.
- Concern route preselects consultation concerns.
- Ingredient fallback never applies to unknown products.
- Pairings never include the current product and do not rely on catalogue order.
- Broken external utility links are not shipped unresolved.
- No unsupported operational or sustainability promises are added.

## Status

- [x] Completed work consolidated.
- [x] Priority 1 dependencies identified.
- [x] Priority 2 and 3 opportunities separated.
- [x] Unsupported features deferred.
- [ ] Broken Help links replaced with verified destinations.
- [ ] Browser-based visual QA completed.
