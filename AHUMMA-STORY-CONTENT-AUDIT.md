# Ahumma Story, Ingredient, and Editorial Audit

## Current experience

Inspected:

- `app/about/page.tsx`
- `lib/homepage.ts`
- `components/ingredient-story-card.tsx`
- `components/product-ingredient-story.tsx`
- `app/page.tsx`
- `app/faq/page.tsx`
- `lib/faq.ts`
- `public/images/`

Ahumma currently has:

- A focused About hero.
- A belief-led origin story.
- A philosophy section built around care rather than correction.
- An African heritage section.
- A visual story break using existing photography.
- A “Why Ahumma” section.
- Ingredient stories linked to matching products.
- Product-page ingredient stories with bounded fallbacks.
- Shop and consultation routes from the About page.
- FAQ content covering brand, product, ingredient, skin-concern, shipping, and care questions.
- Editorial product rows embedded in commerce pages rather than a separate journal.

## Reference comparison

### Arami — verified

Arami's accessible story content is rooted in Lagos, African ingredients, high-performance formulation, simplification, multi-use products, and modern African body care for the world. Its homepage also uses philosophy and routine media to connect belief to product use.

### Aesop — not verified

Direct inspection remained blocked by Cloudflare. No Aesop story or editorial behavior is treated as verified here.

## Recommended story architecture

The current architecture is appropriate and should remain:

1. **Belief:** Care should feel good, and skin does not need correction.
2. **Origin:** Ahumma is Nigerian and shaped by African beauty traditions.
3. **Formulation:** Ingredients and products turn that belief into practical body care.
4. **Experience:** Texture, lather, scent, and the post-shower moment make care repeatable.
5. **Invitation:** Explore the collection or ask for guidance through consultation.

The page should not become a long founder essay or a generic heritage manifesto.

## Content findings

### Keep

- The clear Black and brown skin positioning in the About introduction.
- The short belief-led story.
- The concrete philosophy details: shower, butter, lather, scent, and quiet time.
- The visual break between philosophy and heritage.
- The ingredient section's “every ingredient has a role” framing.
- Product links attached to ingredient stories.
- FAQ answers that distinguish body care from medical treatment and avoid bleaching claims.

### Watch

- “Made for everywhere” language should not become a generic substitute for global relevance. Pair global ambition with specific customer, product, and operational detail.
- Do not repeat “ritual” in every section. The philosophy and product-use sections already establish the idea.
- Keep ingredient descriptions factual and consistent with each product's structured data or bounded fallback.
- Replace placeholder or unsupported testimonials with consented customer proof when available.
- Avoid adding a journal route until Ahumma has a sustainable editorial publishing cadence.

### Do not add yet

- Founder claims that are not documented.
- Ingredient efficacy claims beyond the verified product information.
- A large editorial archive with thin content.
- A standalone ingredient index before there are enough verified ingredient pages.
- A heritage section that treats Africa as a visual theme instead of a formulation and brand source.

## Editorial model

For now, editorial belongs beside the relevant commerce decision:

- Homepage philosophy beside ritual imagery.
- Shop editorial row between product groups.
- Product-page editorial row for a different product with a clear route onward.
- About visual break between belief and heritage.
- Ingredient stories linked to products.
- FAQ answers for practical education.

A future journal should earn its own route only when Ahumma can maintain useful content such as:

- Ingredient origins and formulation context.
- Body-care education for Black and brown skin.
- Nigerian beauty traditions presented with specificity.
- Product-use rituals.
- Founder or maker stories with verified facts.

## Media guidance

Use existing assets first:

- `hero-woman.png` for human, quiet-care storytelling.
- `skin-closeup.jpg` for skin and texture context.
- Product ritual images for product-use stories.
- Texture images for ingredient and sensory sections.

Every story section should have a clear relationship between image and copy. Avoid adding decorative images that repeat the same product shot without advancing the story.

## Acceptance criteria

- About remains scannable on mobile.
- The page moves from belief to origin to product relevance without repeating paragraphs.
- Ingredient links resolve to products that actually match the curated data.
- Unknown live product metadata does not produce invented ingredient claims.
- Consultation and Shop remain visible next steps.
- FAQ remains the practical support layer rather than being duplicated inside About.
- Editorial modules do not interrupt purchase or consultation paths.
- Copy remains punchy, Nigerian-rooted, premium, and specific to Black and brown skin.

## Status

- [x] Current story and About inventory.
- [x] Arami story comparison.
- [x] Aesop access limitation documented.
- [x] Ingredient-to-product story system implemented.
- [x] Existing media mapped to story jobs.
- [x] Editorial route deferred until content cadence exists.
- [x] About-to-Shop and About-to-Consultation routes confirmed.
