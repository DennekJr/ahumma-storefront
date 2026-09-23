# Ahumma Inspiration Regression QA

## Static checks completed

- `bun run check` — passed.
- `git diff --check` — passed.
- Changed TypeScript files report no diagnostics.
- Approved hero headline remains `A New Ritual for Black and Brown Skin.`.
- Approved hero supporting line remains Nigerian-rooted and specific to Black and brown skin.
- Hero continues to use the existing `CloudBackdrop`.
- Footer newsletter remains rendered in `SiteFooter`.
- Footer popup remains a separate `FooterSignupPopup`.
- Concern routes link to consultation with a concern query.
- Consultation reads the concern query and preselects mapped checkboxes.
- Product ingredient stories use structured data first and bounded known-product fallbacks only.
- Unknown products receive no ingredient fallback claims.
- Ritual pairings are resolved from explicit relationships and exclude the current product.
- Product pairing no longer uses the first three products in catalogue order.
- Popup storage is read before footer observation begins.
- Existing keyboard, focus, Escape, backdrop, and reduced-motion code remains present.

## Verified external-link failures

These footer destinations returned 404 during live fetch:

- `https://ahumma.com/contact/`
- `https://ahumma.com/delivery/`
- `https://ahumma.com/return-cancellations/`
- `https://ahumma.com/privacy-policy/`

The Terms link currently points to the same privacy-policy URL. These links should not ship unresolved, but legal and contact destinations should not be invented.

## Browser-only QA still required

No browser automation dependency or visual test script is configured in `package.json`. The following still require a real browser or device pass:

- 1440px desktop layout.
- 1024px tablet layout.
- 768px transition layout.
- 430px mobile layout.
- 390px mobile layout.
- Homepage hero composition and image crops.
- Concern selection and consultation prefill in the browser.
- Product ingredient and pairing rendering with preview and live catalogue states.
- Footer newsletter and popup suppression across reload/session boundaries.
- Menu and cart drawer focus behavior.
- Checkout preview interaction.
- Reduced-motion rendering.
- Layout shift and touch-target inspection.

## QA status

- [x] Static regression pass.
- [x] Typecheck.
- [x] Diff whitespace check.
- [x] External Help link check.
- [ ] Browser visual pass.
- [ ] Replace broken Help/legal destinations.
