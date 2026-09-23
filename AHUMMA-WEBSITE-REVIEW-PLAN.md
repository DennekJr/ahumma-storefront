# Ahumma Website Review — Fix List and Implementation Plan

**Source:** Website review held September 16, 2026
**Scope:** Homepage, conversion path, navigation, forms, promotional surfaces, product pages, About page, footer, and launch QA

## 1. Overall direction

The site is visually lively and has strong foundations. The review identified three central problems:

1. The brand does not feel global or distinctive enough yet.
2. There is too much copy and not enough visual storytelling.
3. The journey from the hero to the footer does not yet feel like one cohesive story.

Work should begin with the homepage and conversion path, then move through the design system, navigation, forms, product pages, About page, footer, and final QA.

## 2. Priority fix list

### Priority 1 — Homepage hero

#### Problems

- The hero does not make a strong enough global statement.
- The mission is not immediately clear.
- The messaging feels generic and too long.
- The CTA is not personal or engaging enough.
- The visual does not create enough excitement or distinction.
- Approved brand colors are not used consistently.

#### Recommended direction

The hero should communicate that Ahumma is:

- Nigerian-born and globally relevant.
- Creating body care for Black and brown skin.
- Treating care as a ritual, not a correction.
- Premium, sensory, and culturally grounded.

#### Target structure

```text
Full-bleed, memorable image or video
Short mission-led headline
One concise supporting sentence
One primary CTA: Shop or explore the collection
```

#### Possible messaging direction

> **Body care rooted in where we come from. Made for everywhere.**
>
> Beautiful rituals for Black and brown skin, made in Nigeria and created for the world.
>
> **CTA:** Explore the collection

This wording is a direction only. Final hero copy and CTA require brand-team approval before implementation.

#### Acceptance criteria

- The brand proposition is understandable within five seconds.
- The hero has one clear CTA.
- The headline works at desktop and mobile sizes without becoming a paragraph.
- The visual feels premium, global, and unmistakably Ahumma.
- The hero uses approved brand colors rather than arbitrary accents.

### Priority 2 — Cohesive homepage story

#### Problems

- Sections feel like separate blocks rather than one narrative.
- There is too much explanatory copy.
- The connection between heritage, skin, products, and ritual is unclear.
- The “Born in Nigeria” section is longer than it needs to be.
- The page needs more visual moments between text sections.
- The footer does not yet feel like a strong conclusion.

#### Recommended narrative

1. Global, mission-led hero.
2. Concise statement about who Ahumma is for.
3. Visual product or ritual introduction.
4. Why the care feels different.
5. Product discovery.
6. Nigerian heritage and global ambition.
7. Social proof.
8. Email or consultation conversion.
9. Compact, confident footer.

#### Copy principles

- Keep one idea per section.
- Use short paragraphs instead of dense blocks.
- Let images communicate product and texture details.
- Avoid repeating “Black and brown skin” in every section.
- Replace explanations with sharper, more memorable statements.
- Use the FAQ and About page for depth rather than putting every detail on the homepage.

### Priority 3 — Visual storytelling and photography

#### Recommended additions

Use a considered mix of:

- Product close-ups.
- Skin and texture imagery.
- Product-in-use images.
- Ritual scenes.
- Nigerian environment and material references.
- Human photography.
- Short ambient video where it adds meaning.

#### Product photography requirements

Each key product should ideally have:

- A packshot or clear product image.
- A texture or application image.
- A ritual or lifestyle image.
- A scale or usage-context image.

#### Acceptance criteria

- Product sections use approved, real photography.
- Every major text-heavy section has a visual counterpoint.
- Images have purposeful alt text.
- Video is muted, lightweight, and does not block page interaction.
- Mobile crops preserve the product and subject.

### Priority 4 — Product section and color system

Create a small approved UI color map before applying colors across the site.

| Color role      | Recommended use                                    |
| --------------- | -------------------------------------------------- |
| Forest green    | Primary brand surfaces and high-confidence CTAs    |
| Deep forest     | Hover states, dark navigation, and strong contrast |
| Rose/pink       | Product status, accents, and promotional moments   |
| Porcelain/paper | Main page backgrounds and light CTAs               |
| Sand/cream      | Supporting panels and soft product backgrounds     |

#### Rules

- Do not introduce new colors without approval.
- Use the same CTA treatment across the homepage, shop, product pages, and checkout.
- Reserve pink for moments that need warmth or emphasis.
- Use green for primary brand and purchase actions.
- Maintain accessible contrast for text and controls.

### Priority 5 — Navigation and sidebar menu

#### Problems

- The sidebar/menu feels clumsy and takes up too much visual space.
- The layout needs to feel lighter and more balanced.
- Primary and secondary links need clearer grouping.

#### Recommended changes

- Reduce menu width, padding, and oversized gaps.
- Keep the wordmark and close control visually balanced.
- Use this primary hierarchy:
  - Home
  - Shop
  - About
  - FAQs
  - Bag
- Make secondary links visually quieter.
- Keep mobile tap targets at least approximately 44px.
- Preserve visible focus states.

The menu must be dismissible with the close button, Escape key, backdrop click, and route change.

### Priority 6 — Fixed header

#### Recommended behavior

- Keep the header visible while scrolling.
- Add a subtle background or blur once content passes behind it.
- Preserve the announcement bar without causing layout jumps.
- Ensure the header does not cover headings or anchor targets.
- Keep cart/bag access visible.
- Keep the mobile header compact.

#### Acceptance criteria

The header works consistently on the homepage, product pages, shop, FAQ, About, and partner pages. Navigation to an anchor accounts for the fixed header so content is not hidden beneath it.

### Priority 7 — Newsletter and promotional surfaces

#### Newsletter pop-up

Consider a newsletter pop-up with one of these triggers:

- Exit intent on desktop.
- Display after meaningful engagement.
- Scroll threshold.
- Delayed display on the second page view.

Suggested copy:

> **Join the Ahumma Circle**
>
> First access to new rituals, limited releases and stories from Ahumma.
>
> **CTA:** Join us

#### Promotional banner

Use promotional surfaces for:

- New product launches.
- Small-batch preorder windows.
- Seasonal releases.
- Limited offers.
- Consultation invitations.

#### Rules

- Do not show the newsletter pop-up immediately on page load.
- Do not repeatedly show it after dismissal.
- Store dismissal and submission state.
- Make the close button obvious.
- Respect reduced motion and mobile viewport constraints.
- Keep the message short.

### Priority 8 — Skin consultation form

The consultation form should support useful customer segmentation while presenting Ahumma as a product-guidance service, not a medical or clinical service.

#### Required or primary fields

- First name.
- Last name.
- Email address.
- Consent to receive email communications.
- Skin concern checkboxes.

Recommended skin concern options:

- Dry skin.
- Very dry skin.
- Combination skin.
- Sensitive or reactive skin.
- Rough or textured skin.
- Dull-looking skin.
- Uneven-looking skin tone.
- Body acne or congestion.
- Dark spots or post-inflammatory marks.
- Fragrance sensitivity.
- I am shopping for a baby or child.
- I am not sure what my skin needs.
- Other.

#### Optional fields

- Current body-care routine.
- Products currently used.
- Preferred product texture.
- Fragrance preference.
- Main care goal.
- Country or region.
- How they heard about Ahumma.

#### Safety notice

> Ahumma offers product guidance, not medical advice. For persistent, painful or concerning skin issues, please consult a qualified healthcare professional.

#### Submission behavior

- Send responses to the approved form or CRM destination.
- Apply marketing tags only when the customer has consented.
- Show a clear confirmation state.
- Provide a product recommendation only where the data supports it.
- Do not diagnose or promise to treat conditions.

The checkbox options and final destination still require approval.

### Priority 9 — About page

The About page is one of the stronger areas of the site. Improvements should be focused and should preserve its existing foundation:

- Tighten remaining long paragraphs.
- Make the global ambition more explicit.
- Connect the brand story directly to the products.
- Add more visual pacing between sections.
- End with stronger routes to shopping or consultation.

Recommended structure:

```text
Who Ahumma is
↓
What we believe about skin and beauty
↓
Why African heritage matters
↓
How the products turn that belief into ritual
↓
Explore the collection
```

### Priority 10 — Product pages

#### Recommended hierarchy

1. Product image and status.
2. Product name.
3. Short sensory description.
4. Price and purchase controls.
5. Three concise product benefits.
6. How to use.
7. Ingredients and details.
8. Related products.

#### Content improvements

- Surface texture, scent, and use case early.
- Keep the main description concise.
- Use short benefit statements that are easy to scan.
- Keep technical details available but secondary.
- Use stronger real product photography.
- Make related-product recommendations visually strong.
- Keep Add to Bag persistent or easy to reach on mobile.

### Priority 11 — Footer

The footer should feel like a conclusion, not just a directory.

Recommended structure:

- Short brand statement connected to the hero promise.
- Prominent newsletter signup.
- Shop links.
- About and FAQ links.
- Consultation link.
- Social links.
- Legal links.

Keep the footer concise, useful, and easy to navigate on mobile.

## 3. Implementation plan

### Phase 0 — Confirm direction

Before implementation:

- Approve the global hero message.
- Approve the main CTA wording.
- Confirm the approved color codes.
- Confirm whether consultation is a form, quiz, or email-assisted service.
- Confirm the newsletter tool and destination.
- Confirm final product photography assets.
- Confirm whether pop-ups are allowed immediately or only after launch.

### Phase 1 — Fix the homepage conversion path

1. Rework the hero copy and CTA.
2. Replace or improve the hero visual.
3. Condense homepage copy.
4. Rework the second homepage segment.
5. Tighten the “Born in Nigeria” section.
6. Improve product-section imagery and color treatment.
7. Ensure the page tells one story from hero to footer.

**Deliverable:** A homepage that communicates Ahumma’s global mission quickly and leads naturally into product discovery.

### Phase 2 — Align the design system

1. Create approved color tokens.
2. Apply them to the hero CTA, product cards, product statuses, FAQ pills, checkout CTA, and newsletter surfaces.
3. Standardize button shapes, border radii, serif heading hierarchy, label treatments, and focus states.
4. Reduce visual inconsistency between pages.

**Deliverable:** A coherent visual system that feels like one brand rather than several independently styled pages.

### Phase 3 — Navigation and responsive behavior

1. Reduce sidebar width and padding.
2. Confirm the header remains fixed.
3. Improve mobile navigation spacing.
4. Test desktop, tablet, and small-mobile layouts.
5. Test keyboard navigation, focus states, Escape-to-close, backdrop dismissal, and route-change dismissal.
6. Verify that anchors account for the fixed header.

**Deliverable:** A lighter, easier-to-use navigation system.

### Phase 4 — Consultation and newsletter conversion

1. Finalize consultation checkbox options.
2. Build the consultation form.
3. Add consent and safety language.
4. Connect the form to the approved destination.
5. Add newsletter pop-up behavior.
6. Add frequency controls and dismissal persistence.
7. Add success and error states.
8. Track submissions and conversions.

**Deliverable:** A compliant, useful customer-insight and lead-capture flow.

### Phase 5 — Product and About refinement

1. Audit product photography.
2. Tighten product descriptions.
3. Improve product-benefit scanning.
4. Refine related-product modules.
5. Condense About page copy.
6. Add stronger About-to-Shop and About-to-Consultation paths.

**Deliverable:** Product and brand pages that support both discovery and conversion.

### Phase 6 — Final polish and QA

#### Content QA

- Remove duplicate copy.
- Check all product names and prices.
- Confirm country and shipping claims.
- Confirm the brand name is spelled `Ahumma` everywhere.
- Review CTA labels for consistency.
- Check that every form has a clear success state.

#### Accessibility QA

- Keyboard navigation.
- Visible focus states.
- Form labels and validation errors.
- Modal focus management and dismissal.
- Sufficient color contrast.
- Reduced-motion support.
- Purposeful image alt text.
- Touch target sizes.

#### Responsive QA

Test at minimum:

- 1440px desktop.
- 1024px tablet.
- 768px tablet/mobile transition.
- 430px mobile.
- 390px mobile.

#### Performance QA

- Compress large hero media.
- Lazy-load below-the-fold imagery.
- Keep video muted and lightweight.
- Check the performance impact of pop-ups.
- Prevent layout shift from fonts, images, and the fixed header.

## 4. Recommended priority order

| Priority | Workstream                                          | Impact                 |
| -------: | --------------------------------------------------- | ---------------------- |
|        1 | Homepage hero and mission                           | Very high              |
|        2 | Homepage copy reduction and story flow              | Very high              |
|        3 | Real imagery and visual storytelling                | Very high              |
|        4 | Approved colors and CTA consistency                 | High                   |
|        5 | Fixed header and lighter navigation                 | High                   |
|        6 | Consultation form                                   | High                   |
|        7 | Newsletter and promotional pop-ups                  | Medium-high            |
|        8 | Product-page content and imagery                    | Medium-high            |
|        9 | About-page tightening                               | Medium                 |
|       10 | Footer refinement                                   | Medium                 |
|       11 | Final accessibility, responsive, and performance QA | Required before launch |

## 5. First concrete sprint

The first implementation sprint should contain:

- New hero direction.
- Condensed homepage copy.
- Approved CTA color treatment.
- Fixed-header verification.
- Sidebar/menu reduction.
- Consultation form field specification.
- Newsletter pop-up wireframe.
- Homepage visual and content QA.

This sequence addresses the review’s most important concern first: making Ahumma feel globally relevant, visually distinctive, and immediately understandable.
