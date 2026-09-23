/**
 * Homepage editorial content, taken from the brand document.
 *
 * Product entries carry the names to match against the live catalogue rather
 * than hardcoded slugs — the Sika slug has already changed once, and a link
 * that silently 404s is worse than one that falls back to the shop page.
 */

export const RITUAL_CATEGORIES = [
  {
    title: "Whipped body butters",
    tagline: "Rich. Nourishing. Sensory.",
    body: "Beautifully whipped with nourishing plant butters and oils to melt into Black and brown skin, leaving it soft, moisturised and cared for. From everyday nourishment to moments of indulgence, there's a butter for your ritual.",
  },
  {
    title: "Liquid African black soap",
    tagline: "Rooted in tradition. Refined for today.",
    body: "Ara brings the heritage of African black soap into an easy, elevated everyday cleansing ritual. Thoughtfully made for modern body care, it leaves skin feeling clean, refreshed and cared for.",
  },
];

export const RITUAL_PRODUCTS = [
  {
    name: "Sika",
    match: ["sika", "sike"],
    tagline: "An ode to you.",
    body: "A luxurious body butter made with shea, mango and cocoa butters and jojoba oil to deeply nourish dry, dull and uneven-looking skin. Rich, whipped and beautifully softening.",
  },
  {
    name: "Dream Whip",
    match: ["dream"],
    tagline: "To your most desirable dreams.",
    body: "Our signature indulgent body butter. A rich blend of shea, cocoa, mango and avocado butters with nourishing oils, created to leave your skin feeling soft, silky and deeply cared for.",
  },
  {
    name: "Baby Bloom",
    match: ["baby"],
    tagline: "For the little ones you love.",
    body: "Gentle, uncomplicated body care created with delicate skin in mind. Unscented. Simple. Tender.",
  },
  {
    name: "Ara",
    match: ["ara"],
    tagline: "Lathered to cater.",
    body: "Our liquid African black soap, inspired by a beauty ritual passed through generations and thoughtfully made for modern everyday care.",
  },
];

export const WHY_AHUMMA = [
  {
    title: "Natural ingredients",
    body: "Thoughtfully selected plant butters, oils and African beauty ingredients chosen for their nourishing qualities and sensory experience.",
  },
  {
    title: "Sensory rituals",
    body: "Beautiful textures, rich fragrances and satisfying rituals designed to make body care something you genuinely look forward to.",
  },
  {
    title: "African heritage",
    body: "Inspired by the ingredients, rituals and beauty traditions of Africa and reimagined for modern everyday life.",
  },
  {
    title: "Beautiful simplicity",
    body: "Fewer, intentional products. No complicated ten-step routine. Just beautiful body care that earns its place in your ritual.",
  },
];

export const INGREDIENT_STORY = [
  {
    name: "Shea butter",
    body: "A rich, nourishing plant butter long cherished across Africa for caring for dry skin.",
    productMatches: ["ara", "sika"],
  },
  {
    name: "Mango butter",
    body: "A luxurious plant butter that brings richness and softness to body-care formulas.",
    productMatches: ["dream", "sika"],
  },
  {
    name: "Cocoa butter",
    body: "A deeply emollient butter loved for its rich texture and skin-conditioning feel.",
    productMatches: ["dream"],
  },
  {
    name: "Jojoba oil",
    body: "A lightweight botanical oil that helps leave skin feeling soft and conditioned without a heavy finish.",
    productMatches: ["sika"],
  },
  {
    name: "Avocado butter",
    body: "A nourishing plant butter selected for its rich, moisturising feel.",
    productMatches: ["dream"],
  },
  {
    name: "Cocoa pod ash",
    body: "A traditional African ingredient that gives Ara its distinctive cleansing heritage.",
    productMatches: ["ara"],
  },
  {
    name: "African black soap",
    body: "A traditional African cleansing ingredient with generations of beauty heritage behind it.",
    productMatches: ["ara"],
  },
];

export const CIRCLE_BENEFITS = [
  "New product launches",
  "Early access",
  "Beautiful skin stories",
  "Rituals & inspiration",
  "African beauty stories",
  "Exclusive experiences",
];
