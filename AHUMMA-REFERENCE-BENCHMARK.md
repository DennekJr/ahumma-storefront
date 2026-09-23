# Ahumma Reference Benchmark

## Scope

This benchmark compares the current Ahumma storefront with the accessible Arami Essentials experience and records Aesop as unverified where Cloudflare prevented direct inspection.

Reference URLs:

- Arami Essentials: https://aramiessentials.com/
- Aesop: https://www.aesop.com/

This is a pattern study, not a visual or copy-matching exercise. Recommendations adapt customer-experience principles to Ahumma's Nigerian-rooted premium body care for Black and brown skin.

## Research status

### Ahumma — verified from repository

Inspected routes, components, data boundaries, and assets include:

- Homepage: `app/page.tsx`
- Shop: `app/shop/page.tsx`, `app/shop/[category]/page.tsx`
- Product detail: `app/products/[slug]/page.tsx`
- About: `app/about/page.tsx`
- FAQs: `app/faq/page.tsx`
- Consultation: `app/consultation/page.tsx`
- Header and menu: `components/site-header.tsx`
- Footer and signup surfaces: `components/site-footer.tsx`, `components/circle-signup.tsx`, `components/footer-signup-popup.tsx`
- Cart and checkout handoff: `components/cart-provider.tsx`, `app/api/checkout/route.ts`
- Concern discovery: `components/concern-rail.tsx`, `lib/concerns.ts`
- Product and commerce data: `lib/frontdesk.ts`, `lib/store-types.ts`, `lib/demo-products.ts`
- Existing visual library: `public/images/`

### Arami Essentials — verified from accessible pages

The homepage and accessible shop/story pages show:

- Lagos-specific delivery messaging alongside worldwide shipping.
- Currency selection, search, cart, and WhatsApp contact.
- Bestseller-led product discovery.
- Shop-by-concern discovery.
- Lifestyle/routine media and social proof.
- Reuse/refill messaging.
- A concise product philosophy built around repetition.
- Inline Inner Circle signup with a first-order incentive and launch/news framing.
- Grouped footer navigation covering story, gifts, discovery, contact, help, and joining the brand.
- Story positioning rooted in Lagos, African ingredients, high-performance formulation, simplification, multi-use products, and modern African body care for the world.
- Additional visible service or merchandising patterns including reviews, gift cards, personalized gifts, travel sets, stockists, ingredient index, click and collect, and recycle/refill.

### Aesop — not verified in this pass

Direct requests to `https://www.aesop.com/` and `https://www.aesop.com/us/` returned Cloudflare challenge pages. No Aesop page-specific behavior is treated as evidence below. A browser-capable follow-up can enrich the unverified column before Aesop-specific implementation decisions are made.

## Benchmark table

| Experience area                  | Ahumma evidence                                                                                                                                          | Arami verified observation                                                                                                      | Aesop         | Transferable principle                                                                        | Ahumma adaptation                                                                                                                                                    | Priority          |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| Homepage proposition             | `app/page.tsx`: hero states “A New Ritual for Black and Brown Skin.” with Nigerian/global supporting copy and one CTA.                                   | Homepage moves quickly from shipping context to bestsellers, concern discovery, philosophy, media, and signup.                  | Not verified. | Make the promise clear, then let the page prove it through product, story, and service.       | Keep the existing cloud/sky hero and specific Black/brown-skin positioning. Tighten the sequence below the hero before adding more modules.                          | Now               |
| Homepage pacing                  | `app/page.tsx`: philosophy, product carousel, visual break, global story, testimonials, footer.                                                          | Uses concise sections, large media moments, a philosophy statement, and a repeating ticker.                                     | Not verified. | Alternate copy-heavy sections with visual or commercial counterpoints.                        | Keep the editorial rhythm, but audit repeated “ritual” language and avoid adding a ticker unless it adds a distinct brand job.                                       | Next              |
| Announcement and delivery        | `components/announcement-bar.tsx`; delivery details are not the central visible Ahumma content model.                                                    | Explicit Lagos threshold plus worldwide shipping in the announcement bar.                                                       | Not verified. | Remove delivery uncertainty early, especially for a global customer.                          | Use verified Ahumma delivery and currency data in a concise announcement. Do not claim thresholds or destinations until operations confirm them.                     | Next              |
| Primary navigation               | `components/site-header.tsx`: menu drawer links Home, Shop, About, FAQs; bag and currency are available.                                                 | Currency, cart, search, and service/contact are easy utility concepts alongside shopping.                                       | Not verified. | Separate discovery navigation from utility navigation.                                        | Keep the restrained menu. Consider search only when catalogue size and search quality justify it; keep Bag and currency accessible.                                  | Next              |
| Shop landing                     | `app/shop/page.tsx`: “Everything we make,” product count, concern rail, filters, sorting, editorial row, empty/error states.                             | Bestseller section and concern discovery are prominent; product cards expose variants and shopping actions.                     | Not verified. | Help customers choose by need as well as by product name.                                     | Keep concern rail and make its labels, imagery, and URL states feel more deliberate. Add bestseller/newness only from real product data.                             | Now               |
| Product cards                    | `components/collection-card.tsx`, `components/product-card.tsx`: catalogue data, images, prices, variants, and purchase actions.                         | Bestseller cards emphasize repeat use and clear shopping decisions.                                                             | Not verified. | Cards should answer what it is, who it is for, why it matters, and how to continue.           | Add concise sensory/use-case metadata only if present in Frontdesk data; do not invent efficacy, reviews, or ingredients.                                            | Now               |
| Concern discovery                | `components/concern-rail.tsx`, `lib/concerns.ts`: shareable concern URLs and server-rendered filtering.                                                  | “Shop by Concern” is a visible discovery route.                                                                                 | Not verified. | Need-led discovery lowers choice friction.                                                    | Preserve the existing concern rail and improve the content model before adding more filters.                                                                         | Now               |
| Product detail                   | `app/products/[slug]/page.tsx`: gallery, purchase summary, highlights, story, care, sustainability, detail rows, editorial cross-sell, related products. | Product writing focuses on repetition, variants, use, and routine fit.                                                          | Not verified. | Lead with sensory desire, then make practical information easy to find.                       | Keep the existing hierarchy. Strengthen texture, scent, use case, shipping, and related-product logic only from verified product fields.                             | Now               |
| Product media                    | `public/images/`: product packshots, ritual scenes, textures, hero, skin close-up, and lifestyle assets.                                                 | Uses product imagery plus routine/lifestyle media and video.                                                                    | Not verified. | Product proof needs both object clarity and lived-in context.                                 | Continue pairing packshots with ritual and texture imagery. Add video only when Ahumma has owned, performant footage.                                                | Next              |
| Product proof                    | `app/page.tsx`: testimonial cards with named locations; no verified product-review integration is evident.                                               | Homepage includes “as seen in” and visible review/social-proof patterns.                                                        | Not verified. | Distinguish brand testimonials, press, and product reviews.                                   | Keep current testimonials only if they are real and consented. Add review integration only with a trustworthy data source and moderation process.                    | Later             |
| About/story                      | `app/about/page.tsx`: belief, philosophy, African heritage, visual break, reasons, ingredients, Shop and Consultation CTAs.                              | Our Story centers Lagos, African ingredients, high-performance formulation, simplification, and global ambition.                | Not verified. | Origin stories work when they connect directly to product behavior and customer value.        | Preserve the current story architecture and make ingredient/formulation claims evidence-backed and concise.                                                          | Now               |
| Ingredient education             | `app/about/page.tsx` has an ingredients section; no standalone ingredient index route is present.                                                        | Offers an Ingredient Index as a discovery/help destination.                                                                     | Not verified. | Let customers investigate unfamiliar ingredients without overloading product pages.           | First make current ingredient content accurate and scannable. Consider a standalone index only when there are enough verified ingredients and content to warrant it. | Later             |
| Editorial content                | Ahumma has editorial rows and story sections inside commerce pages; no journal route is present.                                                         | Uses “In your routines,” story content, and brand philosophy as editorial support.                                              | Not verified. | Editorial should deepen product desire, not compete with shopping.                            | Keep editorial modules attached to relevant commerce routes; avoid creating a journal until there is a sustainable publishing cadence.                               | Later             |
| Search                           | No search route or search control was found in the inspected Ahumma components.                                                                          | Search is visible as a utility.                                                                                                 | Not verified. | Search is useful when catalogue and content volume create navigation friction.                | Do not add a superficial search box. Add it when indexed product/content data and a useful empty state exist.                                                        | Later             |
| Cart                             | `components/cart-provider.tsx`: persistent local cart, currency-aware totals, delivery zones, recommendations, and checkout handoff.                     | Cart and currency are visible utility functions.                                                                                | Not verified. | Cart should reassure, cross-sell lightly, and make delivery/checkout expectations clear.      | Keep the current drawer model. Improve recommendations only after product relationships are data-backed; avoid random recommendations in production.                 | Next              |
| Checkout handoff                 | `app/api/checkout/route.ts`, `app/checkout/complete/page.tsx`: server-created checkout and direct verification on return.                                | Click and collect and delivery/help routes are visible reference service patterns.                                              | Not verified. | Commerce confidence depends on operational clarity as much as layout.                         | Preserve Frontdesk as source of truth. Add delivery, returns, and pickup language only when operations are configured.                                               | Next              |
| Currency and international reach | Header and cart support configured NGN/USD via `lib/format.ts` and Frontdesk prices.                                                                     | Currency selector and worldwide shipping are explicit.                                                                          | Not verified. | Global ambition should be visible in practical commerce details.                              | Keep API-provided prices, add verified destination/shipping messaging, and avoid browser exchange-rate calculations.                                                 | Now               |
| Consultation/service             | `app/consultation/page.tsx`, `components/consultation-form.tsx`, and `/api/consultation` provide guided skin-care discovery.                             | WhatsApp and contact routes support direct service; consultation is not the primary visible verified pattern.                   | Not verified. | Premium care can include human guidance, but it must stay useful and operationally supported. | Promote consultation as Ahumma’s own differentiator for fit and care guidance, without diagnosis claims.                                                             | Now               |
| Gifting                          | No verified gift card, personalized gift, or set-building route was found.                                                                               | Offers gift cards, personalized gifts, sets, travel sets, and events.                                                           | Not verified. | Gifting can raise product discovery and seasonal conversion.                                  | Add only after giftable products, fulfillment rules, and payment behavior are defined. Start with a simple giftable collection rather than a large feature system.   | Later             |
| Refill/reuse                     | No verified refill or reuse operation was found in Ahumma code or inspected assets.                                                                      | Reuse/refill is a visible product and sustainability proposition.                                                               | Not verified. | Operational proof must precede sustainability messaging.                                      | Do not add refill language or icons until Ahumma can fulfill and explain it.                                                                                         | Do not pursue yet |
| Community and retention          | Footer inline newsletter plus separate delayed popup; `/api/subscribe` handles signup.                                                                   | Inner Circle offers first-order incentive and launch/news updates; footer groups careers, affiliates, referrals, and community. | Not verified. | Give signup a clear ongoing reason, not just an email field.                                  | Keep footer signup primary and popup separate. Use verified launch, education, and consultation follow-up; do not invent a discount.                                 | Now               |
| Footer                           | `components/site-footer.tsx`: brand statement, primary newsletter, Shop/Discover/Help/Connect groups, social and legal links.                            | More extensive grouped footer includes Story, Gifts, Discover, Contact, Help, and Join Us.                                      | Not verified. | Footer should conclude the brand story and route people to help or discovery.                 | Keep current groups focused. Add gifting, stockists, contact, or service only when real routes exist.                                                                | Now               |
| Accessibility and performance    | Header/menu focus management, route dismissal, touch sizing, Next Image, reduced-motion GSAP matchMedia, and semantic FAQ details are present.           | Public fetch exposes cookie controls and utility layers but does not establish implementation quality.                          | Not verified. | Premium should feel calm because interaction and performance are reliable.                    | Continue targeted QA around menu, popup, cart drawer, images, and reduced motion before adding visual effects.                                                       | Now               |

## Five principles Ahumma should borrow

1. **Make practical global context visible.** Pair Nigerian origin with verified delivery, currency, and destination information rather than relying on a broad global claim.
2. **Let customers shop by need.** Ahumma's concern rail is already the right foundation; improve its content and imagery before adding complexity.
3. **Use sensory writing to make repetition desirable.** Product pages should make texture, scent, application, and everyday fit easy to imagine.
4. **Build trust through connected story and commerce.** Ingredient, heritage, consultation, and product pages should reinforce one another without repeating the same paragraph.
5. **Give retention a real reason to exist.** The Ahumma Circle and separate popup should lead to useful launches, education, limited releases, or stories—not generic email capture.

## Five patterns that would dilute Ahumma

1. Broadening the promise to “everyone” or “every body” until the Black and brown skin focus becomes decorative.
2. Adding luxury minimalism that removes Nigerian context, product education, or practical shipping information.
3. Adding refill, sustainability, pickup, gift, or review claims before operations and data support them.
4. Copying recognizable reference-brand slogans, editorial phrasing, typography, color relationships, or page compositions.
5. Adding a journal, search, animation system, or utility layer because a reference site has one rather than because Ahumma customers need it.

## Three Ahumma-specific opportunities

### 1. Concern-to-consultation discovery loop

**Why it is distinctive:** Ahumma already has both concern filters and a structured skin consultation. Connecting them can make the experience more useful for Black and brown skin without pretending to diagnose.

**Recommended behavior:** Each concern route should offer a concise “Need help choosing?” link to `/consultation`, while the consultation completion state should link back to supported product or concern routes.

**Relevant files:**

- `components/concern-rail.tsx`
- `lib/concerns.ts`
- `app/shop/page.tsx`
- `app/consultation/page.tsx`
- `components/consultation-form.tsx`

**Priority:** Now.

### 2. Nigerian ingredient-to-product story system

**Why it is distinctive:** The About page already introduces African ingredients and the product pages already have detail rows and story blocks. A consistent, verified relationship between ingredient education and the products that use it can make Ahumma feel more authoritative without becoming clinical.

**Recommended behavior:** Make ingredient references concise and factual on product pages, then link to a future ingredient index only when enough verified content exists. Keep the current About ingredient section as the initial hub.

**Relevant files:**

- `app/about/page.tsx`
- `app/products/[slug]/page.tsx`
- `components/product-description-blocks.tsx`
- `lib/product-details.ts`
- `lib/homepage.ts`

**Priority:** Next, content dependency first.

### 3. Ritual pairing instead of generic cross-sell

**Why it is distinctive:** Ahumma can use its body butter, soap, texture, and consultation context to suggest a small routine without copying another brand's sets or naming.

**Recommended behavior:** Replace unsupported or random recommendations with data-backed “Pair with” relationships or a simple routine explanation. Keep the recommendation secondary to the product being viewed.

**Relevant files:**

- `app/products/[slug]/page.tsx`
- `components/collection-card.tsx`
- `components/cart-provider.tsx`
- `lib/store-types.ts`
- `lib/demo-products.ts`

**Priority:** Next, data dependency first.

## Prioritized implementation roadmap

### Now

1. Improve the current shop and product copy using verified texture, scent, use, and concern data.
2. Connect concern discovery to consultation without adding diagnosis or unsupported recommendation logic.
3. Confirm global delivery/currency messaging from actual Frontdesk configuration.
4. Keep the footer newsletter and separate popup distinct, while sharpening their respective reasons to join.
5. Continue accessibility and responsive QA on the existing header, cart, popup, and image system.

### Next

1. Introduce data-backed ritual pairing or product relationships.
2. Strengthen product-page service information for shipping, returns, and care.
3. Add owned routine/lifestyle media only when the assets are available and performant.
4. Make current About ingredient content more scannable and factually sourced.

### Later

1. Standalone ingredient index.
2. Search, once the product/content index is large enough to need it.
3. Gifting, gift cards, sets, or travel sets after operational rules are defined.
4. Product reviews or press proof after consented, trustworthy sources are available.
5. Journal/editorial route after a sustainable publishing cadence exists.

### Do not pursue yet

- Refill or reuse claims without an actual fulfillment program.
- Click and collect or stockists without confirmed locations and inventory rules.
- Random cart recommendations in production.
- Aesop-specific visual or copy decisions until the site can be inspected directly.

## Top three implementation sequence

1. **Concern-to-consultation loop** — completed in `app/shop/page.tsx`, `app/consultation/page.tsx`, `components/consultation-form.tsx`, and `lib/concerns.ts`.
2. **Verified global commerce messaging** — remains pending operational confirmation; no unsupported shipping promise was added.
3. **Data-backed ritual pairing** — completed for product pages in `lib/product-merchandising.ts` and `app/products/[slug]/page.tsx`; random empty-cart discovery remains separate from product-page pairings.

## Status

- [x] Ahumma repository inventory.
- [x] Arami homepage and story benchmark.
- [x] Aesop access limitation documented.
- [x] Cross-site experience comparison.
- [x] Five borrowable principles identified.
- [x] Five anti-patterns identified.
- [x] Three Ahumma-specific opportunities identified.
- [ ] Browser-based Aesop inspection.
- [x] Implement the concern-to-consultation loop and data-backed product pairings.
- [ ] Confirm operational global-commerce messaging.
