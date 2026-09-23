# Ahumma Design System, Media, and Interaction Audit

## Current evidence

Inspected:

- `app/globals.css`
- `components/cloud-backdrop.tsx`
- `components/site-header.tsx`
- `components/collection-card.tsx`
- `components/product-ingredient-story.tsx`
- `public/images/`
- Existing reduced-motion and responsive rules.

Ahumma currently uses:

- Porcelain, paper, sand, forest, deep forest, and accent color roles.
- Serif display typography with restrained sans-serif utility text.
- Large editorial whitespace and strong section divisions.
- Cloud/sky hero atmosphere.
- Product packshots paired with ritual, texture, skin, and human imagery.
- Hover image movement and restrained reveal behavior.
- GSAP header compression with reduced-motion matching.
- Semantic focus states, menu transitions, popup behavior, and mobile layouts.

## Reference status

### Arami — verified at principle level

The accessible Arami experience uses clear product imagery, routine/lifestyle media, concise philosophy statements, visual spacing, product cards, and a restrained editorial-commerce balance.

### Aesop — not verified

Direct site inspection remained blocked by Cloudflare. No Aesop-specific token, type, layout, or motion claim is made here.

## Recommended Ahumma design language

### Typography

- Keep serif display headlines for feeling and distinction.
- Keep sans-serif utility copy for navigation, price, labels, and form controls.
- Prefer short display lines with clear line breaks rather than oversized paragraphs.
- Maintain comfortable reading widths for story and FAQ content.

### Color

- Preserve the existing brand roles.
- Use forest/deep forest for actions and dark surfaces.
- Use porcelain/paper for calm reading areas.
- Use sand and restrained accents for product/editorial moments.
- Do not shift the hero background to match a reference brand.

### Media

- Hero: cloud/sky atmosphere with text contrast and no competing product collage.
- Product discovery: packshots for clarity, ritual imagery for feeling.
- Product pages: packshot first, texture/use media second.
- About: human imagery and ingredient context.
- Consultation: close skin detail that supports care, not diagnosis.
- Newsletter popup: one owned image that makes the interruption feel intentional.

### Interaction

- Motion should clarify state changes: menu, header, image hover, popup, loading, and product selection.
- Keep transformations on opacity and transform where possible.
- Do not add looping decorative animation to every section.
- Respect reduced-motion preferences.
- Preserve keyboard focus and touch-target sizing.

## Performance guardrails

- Use `next/image` for owned raster media.
- Keep the first hero image prioritized and below-the-fold media lazy.
- Use accurate `sizes` values.
- Avoid adding video until Ahumma has owned footage and an explicit mobile fallback.
- Do not add blur or backdrop effects where they create unnecessary paint cost.
- Keep editorial images from causing layout shift by retaining dimensions/aspect ratios.

## Anti-copy guardrails

Do not copy:

- Reference-brand typography choices as a package.
- Distinctive product-card or menu compositions.
- Reference-brand slogans or editorial phrases.
- Photography, image treatment, logo behavior, or branded motion signatures.

Borrow only:

- Restraint.
- Clear product hierarchy.
- Sensory pacing.
- Useful whitespace.
- Motion that explains interaction.

## Status

- [x] Existing design tokens and media inventory.
- [x] Hero background preserved.
- [x] Product, skin, texture, and human media mapped.
- [x] Reduced-motion and interaction guardrails documented.
- [x] Aesop access limitation documented.
- [x] Unsupported visual changes deferred.
- [ ] Browser-based visual review at the required viewport set.
