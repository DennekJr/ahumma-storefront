# Ahumma Retention and Relationship Audit

## Current experience

Inspected:

- `components/site-footer.tsx`
- `components/circle-signup.tsx`
- `components/footer-signup-popup.tsx`
- `app/api/subscribe/route.ts`
- `AHUMMA-PROPOSED-COPY.md`

Ahumma currently has:

- An inline footer newsletter that remains visible and is the primary signup surface.
- A separate delayed popup triggered when the footer enters view.
- Session suppression after the popup has appeared.
- Persistent “Don’t show again” suppression.
- Escape, backdrop, close-button, focus trapping, and focus restoration behavior.
- Shared signup submission handling with loading, success, honeypot, and error states.
- A clear Circle message about first access to new rituals, limited releases, and stories.
- Frontdesk-backed server-side subscription handling.

## Reference comparison

### Arami — verified

Arami frames its Inner Circle around first-order value, exclusive offers, product updates, launches, and events. It also exposes gifting, travel sets, referrals, affiliates, reuse/refill, contact, and community routes.

### Aesop — not verified

Direct inspection remained blocked by Cloudflare. No Aesop retention behavior is treated as verified.

## Implemented fix

The popup now waits for local storage to load before observing the footer. This prevents a persistent “Don’t show again” preference from being bypassed during the initial render race.

Relevant file:

- `components/footer-signup-popup.tsx`

## Retention recommendations

### Keep now

1. Keep the inline footer signup as the primary surface.
2. Keep the popup as a separate promotional moment, not a fallback.
3. Use launch, limited-release, education, and story messaging that Ahumma can actually send.
4. Keep the current suppression and accessibility behavior.
5. Keep the signup API server-side and avoid exposing integration credentials.

### Add when operationally ready

- A configured first-order incentive, only when the offer and redemption rules exist.
- A short welcome sequence with product education and consultation guidance.
- Product replenishment or care reminders based on consent and actual purchase data.
- Gift cards, sets, or travel formats once fulfilment and catalogue rules are defined.
- Referral or community programs once ownership and tracking are clear.
- WhatsApp or direct service support only when a team is responsible for responses.

### Do not add yet

- A discount promise that is not configured.
- Refill or reuse claims without a real refill flow.
- Gift cards or personalized gifts without fulfilment rules.
- A loyalty scheme before repeat-purchase data and service ownership exist.
- More popups or overlapping signup prompts.
- Marketing personalization based on skin concerns unless consent and data handling are defined.

## Newsletter copy direction

### Inline footer

> Join the Ahumma Circle.
> First access to new rituals, limited releases and stories from Ahumma.
> Join us

### Popup

Use the same core promise but make the interruption feel like a distinct moment. The popup should only mention an incentive, launch, or limited release when it is real and configured.

## Consent and data notes

- The API validates the email at the server boundary.
- The form includes a honeypot for basic bot filtering.
- The integration destination is server-side.
- Consent language and unsubscribe handling should be confirmed against the email provider and applicable markets before launch.
- Do not send skin consultation answers through the newsletter route.

## Acceptance criteria

- Footer signup remains visible even when the popup is suppressed.
- Popup does not open immediately on page load.
- Persistent suppression survives reloads.
- Session suppression prevents repeat interruption.
- Successful signup closes/suppresses the popup and shows a success state.
- Errors remain recoverable.
- Focus is trapped inside the popup and restored after close.
- Reduced-motion behavior remains respected by the surrounding styles.
- No unsupported discount, refill, gifting, or community promise appears.

## Status

- [x] Footer and popup inventory.
- [x] Arami retention comparison.
- [x] Aesop access limitation documented.
- [x] Footer-primary and popup-separate behavior confirmed.
- [x] Popup storage race fixed.
- [x] Unsupported gifting, refill, loyalty, and discount promises deferred.
- [ ] Confirm consent and unsubscribe requirements with the email provider.
- [ ] Add a welcome or replenishment sequence after purchase/list data is available.
