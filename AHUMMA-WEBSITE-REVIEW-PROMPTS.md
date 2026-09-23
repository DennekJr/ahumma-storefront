# Ahumma Website Review — Prompt Library

Use these prompts sequentially or independently with a design, copy, or coding agent. Each prompt assumes the agent has access to the Ahumma storefront repository and should inspect the existing implementation before recommending or changing anything.

## 1. Full-site review and implementation roadmap

```text
Review the Ahumma storefront against AHUMMA-WEBSITE-REVIEW-PLAN.md. Inspect the current homepage, navigation, header, product pages, About page, forms, promotional surfaces, and footer.

Identify what is already implemented, what is partially implemented, and what is missing. Compare the current experience against the review priorities and acceptance criteria.

Return:
1. A concise findings summary.
2. A prioritized list of verified issues with file paths.
3. Quick wins versus larger changes.
4. Risks, dependencies, and decisions that affect implementation.
5. A recommended implementation sequence for the first sprint.

Do not change code. Base every finding on evidence from the repository and clearly label assumptions.
```

## 2. Homepage hero direction

```text
Audit and improve the Ahumma homepage hero using the requirements in AHUMMA-WEBSITE-REVIEW-PLAN.md.

The hero must communicate within five seconds that Ahumma is Nigerian-born, globally relevant, creates premium body care for Black and brown skin, and treats care as a ritual rather than a correction.

Inspect the existing hero component, copy, media, colors, responsive behavior, and CTA. Propose up to three concise hero directions, each with:
- Headline
- Supporting sentence
- One CTA
- Visual direction
- Desktop and mobile composition
- Rationale

Implement the strongest direction using the working Ahumma claims already present in the repository. Flag factual claims that need verification, but do not stop implementation for a separate approval step.
```

## 3. Homepage narrative and copy reduction

```text
Review the Ahumma homepage from hero to footer as one continuous story rather than as separate sections.

Map the current sections in order, identify repeated or overly explanatory copy, and compare the flow against this narrative:
1. Global mission-led hero
2. Who Ahumma is for
3. Product or ritual introduction
4. Why the care feels different
5. Product discovery
6. Nigerian heritage and global ambition
7. Social proof
8. Email or consultation conversion
9. Confident footer

Return a section-by-section rewrite and restructuring plan. For each section, specify its single idea, recommended copy length, visual counterpoint, CTA if needed, and what content should move to the About or FAQ page.

Do not edit files. Preserve the Ahumma voice and avoid repeating “Black and brown skin” in every section.
```

## 4. Visual storytelling and media audit

```text
Audit the Ahumma storefront’s imagery and media against the visual storytelling requirements in AHUMMA-WEBSITE-REVIEW-PLAN.md.

Inspect the public assets, image usage, video usage, alt text, loading behavior, object positioning, and mobile crops. Identify every major text-heavy section that lacks a visual counterpoint.

Create a media plan with:
- Existing assets that should be reused
- Missing asset types
- Recommended image or video placement
- Required subject, crop, scale, and usage context
- Alt-text direction
- Performance and lazy-loading requirements
- Mobile-art-direction notes

Do not fabricate photography assets or claim that an image exists unless it is present in the repository.
```

## 5. Color system and CTA consistency

```text
Audit the Ahumma color usage across the homepage, shop, product pages, FAQ, checkout, navigation, newsletter surfaces, and forms.

Use only the approved color roles from AHUMMA-WEBSITE-REVIEW-PLAN.md:
- Forest green: primary brand surfaces and purchase CTAs
- Deep forest: hover states, dark navigation, and contrast
- Rose/pink: accents, product status, and promotional moments
- Porcelain/paper: main backgrounds and light CTAs
- Sand/cream: supporting panels and soft product backgrounds

Identify arbitrary or inconsistent colors, contrast risks, and CTA variations. Propose a minimal token map and component application plan using existing project conventions.

Keep the change focused, reuse the existing design tokens, and verify contrast for text and controls.
```

## 6. Navigation, sidebar, and fixed-header review

```text
Review and improve Ahumma’s navigation, sidebar menu, and fixed header.

Verify the following:
- Primary links are Home, Shop, About, FAQs, and Bag.
- The sidebar does not dominate the viewport.
- Primary and secondary links have clear hierarchy.
- The header remains available while scrolling.
- The announcement bar does not create layout jumps.
- Anchor targets are not hidden beneath the fixed header.
- The menu closes through the close button, Escape, backdrop click, and route change.
- Keyboard focus is visible.
- Mobile tap targets are approximately 44px or larger.

First report the current behavior and relevant files. Then propose the smallest implementation plan. If implementing, test desktop, tablet, mobile, keyboard, focus, and dismissal behavior.
```

## 7. Newsletter signup and promotional surfaces

```text
Design and implement the Ahumma newsletter as an inline footer conversion surface plus a separate delayed promotional modal.

The newsletter message should use this direction:
“Join the Ahumma Circle. First access to new rituals, limited releases and stories from Ahumma.”
CTA: “Join us”

The inline newsletter should remain visible in the footer and should be the primary signup path. The separate promotional modal must not show immediately on page load; evaluate engagement or second-page-view timing, persist dismissal and submission state, provide an obvious close action, respect reduced motion, and keep it usable on small mobile screens.

Return:
1. Trigger recommendation and rationale.
2. Frequency and persistence rules.
3. Desktop, tablet, and mobile wireframe description.
4. Success and error states.
5. Accessibility and analytics requirements.
6. Relevant implementation files.

Use the configured newsletter integration. If credentials or a destination are missing, keep the existing integration boundary and report the exact environment variable or endpoint needed.
```

## 8. Skin consultation form

```text
Design and implement the Ahumma skin consultation form based on AHUMMA-WEBSITE-REVIEW-PLAN.md.

Include first name, last name, email, marketing consent, skin-concern checkboxes, and optional routine, product, texture, fragrance, care-goal, region, and referral fields.

Use this safety notice exactly:
“Ahumma offers product guidance, not medical advice. For persistent, painful or concerning skin issues, please consult a qualified healthcare professional.”

The form must:
- Use clear labels and validation errors.
- Apply marketing tags only with consent.
- Support a clear loading, success, and error state.
- Avoid diagnosis or treatment claims.
- Send data only to the approved form or CRM destination.
- Provide recommendations only where the submitted data supports them.

First inspect existing form and integration patterns. Use `FRONTDESK_CONSULTATION_FORM_URL` as the submission destination and document the environment requirement if it is not configured.
```

## 9. About page refinement

```text
Review the Ahumma About page while preserving its existing strengths.

Refine it around this sequence:
1. Who Ahumma is
2. What Ahumma believes about skin and beauty
3. Why African heritage matters
4. How the products turn that belief into ritual
5. Explore the collection

Identify long paragraphs, repeated ideas, weak transitions, missing visual pacing, and unclear links to products or consultation. Recommend concise copy edits, visual breaks, and stronger Shop and Consultation routes.

Do not rewrite the page into generic brand language. Do not implement until the recommended content direction is clear.
```

## 10. Product-page conversion review

```text
Audit Ahumma product pages against this hierarchy:
1. Product image and status
2. Product name
3. Short sensory description
4. Price and purchase controls
5. Three concise benefits
6. How to use
7. Ingredients and details
8. Related products

Check whether texture, scent, use case, benefits, imagery, stock, price, and Add to Bag controls are easy to scan. Review mobile reachability of the purchase action and the quality of related-product recommendations.

Return a product-page content and layout plan with verified file paths. Prioritize real product imagery and concise sensory writing. Keep technical information available but secondary. Do not invent product claims, ingredients, prices, or photography.
```

## 11. Footer and conversion-path review

```text
Review the Ahumma footer as the conclusion of the homepage story and as a conversion surface.

The footer should include:
- A short brand statement connected to the hero promise
- Prominent newsletter signup
- Shop links
- About and FAQ links
- Consultation link
- Social links
- Legal links

Check hierarchy, mobile usability, link completeness, repeated copy, and whether the footer supports both discovery and conversion. Recommend the smallest content and layout changes needed. Confirm that all links work and that the footer does not feel like only a directory.

Do not implement unrelated visual changes elsewhere on the site.
```

## 12. Final launch QA and regression pass

```text
Run a final QA pass against AHUMMA-WEBSITE-REVIEW-PLAN.md after the approved changes are implemented.

Test at minimum:
- 1440px desktop
- 1024px tablet
- 768px transition width
- 430px mobile
- 390px mobile

Check:
- Hero proposition and single CTA
- Homepage narrative and copy repetition
- Image alt text and mobile crops
- Color contrast and CTA consistency
- Fixed header and anchor offsets
- Sidebar dismissal and focus behavior
- Form labels, consent, errors, success, and safety notice
- Newsletter persistence and close behavior
- Product purchase flow and mobile Add to Bag access
- About-to-Shop and About-to-Consultation routes
- Footer links and newsletter access
- Reduced-motion behavior
- Layout shift from fonts, images, header, and pop-ups
- Hero media size and below-the-fold lazy loading

Return a severity-ranked QA report with reproduction steps, affected file paths, and recommended fixes. Fix only issues introduced by the current work or issues required by the acceptance criteria. Do not hide or dismiss failures.
```

## Suggested usage order

Completed prompts are marked so the next workstream is clear:

- [x] 1. Full-site review and implementation roadmap.
- [x] 2. Homepage hero direction.
- [x] 3. Homepage narrative and copy reduction.
- [x] 4. Visual storytelling and media audit.
- [x] 5. Color system and CTA consistency.
- [x] 6. Navigation, sidebar, and fixed-header review.
- [x] 7. Newsletter signup and promotional surfaces.
- [x] 8. Skin consultation form.
- [x] 9. About page refinement.
- [x] 10. Product-page conversion review.
- [x] 11. Footer and conversion-path review.
- [x] 12. Final launch QA and regression pass.

Use the working brand copy, token map, available photography, and configured integrations. Verify factual product and regulatory claims during final QA.
