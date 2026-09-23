# Ahumma Navigation, Search, Service, and Commerce Utility Audit

## Current experience

Inspected:

- `components/site-header.tsx`
- `components/site-footer.tsx`
- `components/cart-provider.tsx`
- `components/announcement-bar.tsx`
- `app/faq/page.tsx`
- `app/consultation/page.tsx`
- `app/api/delivery-zones/route.ts`
- `app/api/checkout/route.ts`
- `lib/frontdesk.ts`

Ahumma currently provides:

- A compact header with menu, wordmark, bag, item count, and currency selector.
- A dismissible menu drawer with Home, Shop, About, FAQs, and currency controls.
- Route-change menu dismissal, Escape handling, backdrop close, focus restoration, and focus trapping.
- A persistent cart drawer with local storage, quantity controls, currency-aware totals, delivery-zone loading, and secure checkout handoff.
- FAQ navigation and practical service content.
- A skin consultation route and structured submission boundary.
- Footer Shop, Discover, Help, Connect, social, legal, and newsletter routes.
- Frontdesk-backed product, currency, delivery, and checkout boundaries.

## Reference comparison

### Arami — verified

Arami exposes currency, cart, search, WhatsApp contact, story, gifts, discovery, stockists, ingredient index, click and collect, recycling/refill, order tracking, and help routes.

### Aesop — not verified

Direct fetch remained blocked by Cloudflare. No Aesop utility behavior is treated as verified.

## Recommendations

### Keep and polish

1. Keep the compact menu rather than adding a large desktop navigation system.
2. Keep Bag and currency visible and easy to reach.
3. Keep consultation in the Discover/footer path as Ahumma's service differentiator.
4. Keep FAQ as the practical support layer.
5. Continue testing focus, route changes, touch targets, and reduced motion.

### Add when supported

- Verified delivery destinations and thresholds in the announcement/help layer.
- A direct WhatsApp or contact route if the client confirms the channel and response ownership.
- Track-order support only when there is a real order lookup flow.
- Search only once product/content indexing and empty states are ready.
- Gifting, pickup, stockists, and refill only after operations are confirmed.

### Do not add now

- A search icon that does not search useful content.
- Utility links to unowned or stale external pages.
- Account navigation without an account/order system.
- A large mega-menu for the current catalogue size.
- Operational promises that cannot be fulfilled in Nigeria and international markets.

## Priority issue

The footer currently points Help links to external Ahumma URLs that were verified as 404 during this pass: `/contact/`, `/delivery/`, `/return-cancellations/`, and `/privacy-policy/`. Before launch, bring the pages into this app or replace the links with verified canonical routes. Do not replace legal or contact destinations with invented pages.

Relevant file:

- `components/site-footer.tsx`

This is an operational/content verification task, not a reason to add speculative pages.

## Acceptance criteria

- Every visible utility link resolves to a verified, useful destination.
- Menu and cart controls remain keyboard accessible.
- Currency selection uses API-provided prices and persists correctly.
- Delivery and checkout errors explain the next action.
- Search is not added until it can return meaningful results.
- New utility features do not compete with Shop or Consultation.
- Mobile controls remain comfortably tappable.

## Status

- [x] Header and menu inventory.
- [x] Cart and checkout utility inventory.
- [x] FAQ and consultation service inventory.
- [x] Arami utility comparison.
- [x] Aesop access limitation documented.
- [x] Search deferred until useful indexing exists.
- [x] Gifting, pickup, stockist, and refill deferred pending operations.
- [ ] Replace the verified 404 Help links with approved internal or canonical destinations.
