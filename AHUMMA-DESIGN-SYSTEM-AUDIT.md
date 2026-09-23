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

Ahumma uses two editorial type systems. The token name is also the family rule: `sans` tokens render in `var(--sans)`, and `serif` tokens render in `var(--serif)`.

| Family | Token                      | Role        | Approved use                                                          |
| ------ | -------------------------- | ----------- | --------------------------------------------------------------------- |
| Sans   | `--type-sans-micro`        | Micro       | Counts, status text, compact metadata, helper text                    |
| Sans   | `--type-sans-label`        | Label       | Eyebrows, uppercase labels, secondary links, field labels             |
| Sans   | `--type-sans-small`        | Small       | Supporting copy, captions, compact descriptions                       |
| Sans   | `--type-sans-body`         | Body        | Prices, short product metadata, default compact body copy             |
| Sans   | `--type-sans-ui`           | UI          | Navigation, controls, form inputs, utility text                       |
| Sans   | `--type-sans-lead`         | Lead        | Larger sans-serif supporting copy where a serif voice is not intended |
| Serif  | `--type-serif-label`       | Label       | Serif buttons, product tags, ingredient headings, editorial labels    |
| Serif  | `--type-serif-body`        | Body        | Product ledes, story copy, FAQ introductions, serif paragraphs        |
| Serif  | `--type-serif-section`     | Section     | Section headings, menu links, editorial statements, large actions     |
| Serif  | `--type-serif-display`     | Display     | Hero headlines, page titles, major campaign and closing statements    |
| Serif  | `--type-serif-hero-action` | Hero action | Hero-specific serif buttons and action links                          |

#### Pairing rules

- Choose the family first, then choose the smallest semantic role that fits the content.
- Sans is the default for navigation, forms, prices, metadata, labels, and operational UI.
- Serif is for brand voice, editorial storytelling, product narratives, section headings, and display moments.
- A serif family must use a `--type-serif-*` token. A sans family must use a `--type-sans-*` token.
- Do not introduce a new numeric `font-size`, one-off `clamp()`, or an unnamed type token for a component.
- Do not use a serif token on an element that inherits the sans family. Set the family explicitly or use the matching sans token.
- Use `font-size: inherit` only when a child intentionally shares its parent’s complete typographic role.
- `--mono` is reserved for code-like content such as `code`, `pre`, `kbd`, and `samp`; it is not a general UI family.
- Responsive scaling belongs in the shared tokens. Components should not create their own art-directed type scale.

#### Tracking, leading, and casing

Use these shared supporting tokens with the type roles above:

| Concern  | Tokens                                                                            | Use                                                              |
| -------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Tracking | `--tracking-normal`                                                               | UI text that should follow the font’s default spacing            |
| Tracking | `--tracking-display`, `--tracking-heading`, `--tracking-copy`                     | Serif display, heading, and reading text                         |
| Tracking | `--tracking-label`, `--tracking-caps`, `--tracking-field`, `--tracking-eyebrow`   | Links, uppercase metadata, form labels, and eyebrows             |
| Tracking | `--tracking-zero`, `--tracking-wide`                                              | Explicit zero tracking and wide eyebrow treatments               |
| Leading  | `--leading-zero`, `--leading-tight`, `--leading-display`, `--leading-art-display` | Layout resets, controls, and display headlines                   |
| Leading  | `--leading-compact`, `--leading-normal`                                           | Compact labels and editorial copy                                |
| Leading  | `--leading-body`, `--leading-relaxed`, `--leading-loose`                          | Paragraphs and long-form reading content                         |
| Casing   | `--case-none`, `--case-upper`                                                     | Sentence case by default; uppercase only for labels and metadata |

- Use a tracking token instead of a numeric `letter-spacing` value.
- Use a leading token instead of a numeric `line-height` value.
- Use `--case-upper` only when the content is intentionally a label, status, field name, or metadata treatment.
- Do not uppercase headlines, paragraphs, product names, or customer-facing sentences by default.
- Keep casing in CSS only when it is a visual treatment; preserve meaningful text casing in the source content.

Keep serif display headlines for feeling and distinction. Prefer short display lines with clear line breaks rather than oversized paragraphs, and maintain comfortable reading widths for story and FAQ content.

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
