import type { ProductDetail, ProductSummary } from "@/lib/store-types";

export const demoProducts: ProductDetail[] = [
  {
    ref: "preview_ara",
    name: "Ara Refined African Black Soap",
    slug: "ahumma-ara-refined-african-black-soap",
    description:
      "A gentle liquid African black soap that cleanses without taking your skin's comfort with it.",
    coverUrl: "/images/ara-soap.jpg",
    media: [
      "/images/ara-soap.jpg",
      "/images/ara-ritual.jpg",
      "/images/ara-texture.jpg",
    ],
    currency: "NGN",
    priceMinorFrom: 2210000,
    pricesFrom: { USD: 2199 },
    compareAtMinorFrom: null,
    variantCount: 1,
    soldOut: false,
    preorderable: true,
    needsDelivery: true,
    variants: [
      {
        ref: "preview_variant_ara_500ml",
        name: "500 ml",
        priceMinor: 2210000,
        currency: "NGN",
        prices: [{ currency: "USD", priceMinor: 2199, compareAtMinor: null }],
        soldOut: false,
        media: ["/images/ara-soap.jpg"],
        description: "16 oz / 500 ml",
      },
    ],
    preorderEtaText: "Prepared in small batches.",
    info: {
      brand: "Ahumma",
      infoCategory: "Cleanse",
      longDescription:
        "Experience the gentle power of tradition reimagined. Ara blends shea butter, coconut oil, palm kernel oil and cocoa pod ash into a creamy lather that cleanses without stripping essential moisture. Crafted for hyperpigmentation, body acne and dandruff, it leaves skin feeling balanced, clarified and deeply cared for.",
      highlights: [
        "Targets the look of uneven tone and body acne",
        "Gently cleanses without drying",
        "Enriched with traditional African botanicals",
        "Suitable for skin and scalp rituals",
      ],
      careInstructions:
        "Massage onto damp skin or scalp, work into a generous lather, then rinse well. Follow with body butter while skin is still slightly damp.",
      sustainabilityText:
        "Concentrated care, made in Lagos in considered small batches.",
      countryOfOrigin: "Nigeria",
      weightValue: 500,
      weightUnit: "ml",
      manufacturer: "Ahumma, Lagos",
    },
    previewTagline: "Clarify · Balance · Soften",
    previewVariantRef: "preview_variant_ara_500ml",
  },
  {
    ref: "preview_dream",
    name: "Dream Whip Body Butter",
    slug: "ahumma-body-butter-duo",
    description:
      "A cloud-rich night butter that restores softness and seals in deep, lasting nourishment.",
    coverUrl: "/images/dream-whip.jpg",
    media: [
      "/images/dream-whip.jpg",
      "/images/dream-ritual.jpg",
      "/images/dream-texture.jpg",
    ],
    currency: "NGN",
    priceMinorFrom: 3800000,
    pricesFrom: { USD: 3499 },
    compareAtMinorFrom: null,
    variantCount: 1,
    soldOut: false,
    preorderable: true,
    needsDelivery: true,
    variants: [
      {
        ref: "preview_variant_dream_250ml",
        name: "250 ml",
        priceMinor: 3800000,
        currency: "NGN",
        prices: [{ currency: "USD", priceMinor: 3499, compareAtMinor: null }],
        soldOut: false,
        media: ["/images/dream-whip.jpg"],
        description: "8 oz / 250 ml",
      },
    ],
    preorderEtaText: "Prepared in small batches.",
    info: {
      brand: "Ahumma",
      infoCategory: "Restore",
      longDescription:
        "Drift into deep nourishment with a cloud-like blend of avocado, cocoa and mango butters. Dream Whip melts into the skin to replenish lost moisture, support elasticity and smooth rough texture. Its warm aroma turns night-time care into a slow ritual of calm.",
      highlights: [
        "Deeply hydrates and seals in moisture",
        "Supports softness and elasticity",
        "Smooths rough, tired-looking skin",
        "A comforting night-time ritual",
      ],
      careInstructions:
        "Warm a small amount between palms and press into damp skin at night, paying attention to elbows, knees and other dry areas.",
      sustainabilityText:
        "A concentrated, water-conscious formula made in Lagos in considered small batches.",
      countryOfOrigin: "Nigeria",
      weightValue: 250,
      weightUnit: "ml",
      manufacturer: "Ahumma, Lagos",
    },
    previewTagline: "Renew · Comfort · Replenish",
    previewVariantRef: "preview_variant_dream_250ml",
  },
  {
    ref: "preview_sika",
    name: "Sika Body Butter",
    slug: "sika-body-butter",
    description:
      "Everyday radiance for uneven tone, rough texture and skin that wants to feel held.",
    coverUrl: "/images/sika-butter.jpg",
    media: [
      "/images/sika-butter.jpg",
      "/images/sika-ritual.jpg",
      "/images/sika-texture.jpg",
    ],
    currency: "NGN",
    priceMinorFrom: 2620000,
    pricesFrom: { USD: 2499 },
    compareAtMinorFrom: null,
    variantCount: 1,
    soldOut: false,
    preorderable: true,
    needsDelivery: true,
    variants: [
      {
        ref: "preview_variant_sika_250ml",
        name: "250 ml",
        priceMinor: 2620000,
        currency: "NGN",
        prices: [{ currency: "USD", priceMinor: 2499, compareAtMinor: null }],
        soldOut: false,
        media: ["/images/sika-butter.jpg"],
        description: "8 oz / 250 ml",
      },
    ],
    preorderEtaText: "Prepared in small batches.",
    info: {
      brand: "Ahumma",
      infoCategory: "Illuminate",
      longDescription:
        "Celebrate your skin with shea butter, jojoba oil and CoQ10, lifted by citrus-vanilla notes. Sika is lightweight yet deeply nourishing, helping soften rough patches, support an even-looking tone and restore everyday radiance.",
      highlights: [
        "Smooths rough patches and textured skin",
        "Supports a bright, even-looking tone",
        "Nourishes without heaviness",
        "Enhances natural radiance",
      ],
      careInstructions:
        "Massage into clean, damp skin each morning or whenever skin needs comfort. Patch test before first use.",
      sustainabilityText:
        "A concentrated, water-conscious formula made in Lagos in considered small batches.",
      countryOfOrigin: "Nigeria",
      weightValue: 250,
      weightUnit: "ml",
      manufacturer: "Ahumma, Lagos",
    },
    previewTagline: "Smooth · Brighten · Glow",
    previewVariantRef: "preview_variant_sika_250ml",
  },
];

export const demoProductSummaries: ProductSummary[] = demoProducts.map(
  ({ variants: _variants, media: _media, info: _info, ...product }) => product,
);
