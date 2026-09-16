import { FAQ_ENTRIES, faqAnswerText, type FaqEntry } from "@/lib/faq";
import type { ProductDetail } from "@/lib/store-types";

/**
 * JSON-LD builders.
 *
 * Search engines and AI assistants read this markup to decide what Ahumma is
 * and what it sells, so every value here comes from real product or FAQ data.
 * Anything we cannot state accurately is left out rather than guessed at —
 * fabricated ratings or availability are worse than absent ones.
 */

const SITE_NAME = "Ahumma";

export function siteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configured) {
    try {
      return new URL(configured).origin;
    } catch {
      // Fall through when deployment configuration is malformed.
    }
  }

  return "https://www.ahumma.com";
}

function absolute(path: string | null | undefined) {
  if (!path) return undefined;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: siteUrl(),
    logo: absolute("/images/ahumma-logo.png"),
    description:
      "Ahumma is a Nigerian-born premium body-care brand for Black and brown skin, creating whipped body butters and liquid African black soap rooted in African heritage.",
    slogan: "At the edge of everything beautiful is you.",
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lagos",
        addressCountry: "NG",
      },
    },
    areaServed: [
      { "@type": "Country", name: "Nigeria" },
      { "@type": "Country", name: "United States" },
    ],
    sameAs: ["https://www.instagram.com/ahummabeauty"],
  };
}

export function faqPageSchema(entries: FaqEntry[] = FAQ_ENTRIES) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faqAnswerText(entry),
      },
    })),
  };
}

/**
 * Prices are held in minor units. Schema.org wants a decimal string, and the
 * store quotes NGN with no fractional part, so NGN is divided by 100 the same
 * way formatMoney does.
 */
function priceString(priceMinor: number) {
  return (priceMinor / 100).toFixed(2);
}

export function productSchema(product: ProductDetail) {
  const url = `${siteUrl()}/products/${product.slug}`;
  const images = (product.media?.length
    ? product.media
    : product.coverUrl
      ? [product.coverUrl]
      : []
  )
    .map((image) => absolute(image))
    .filter((image): image is string => Boolean(image));

  const offers = product.variants.flatMap((variant) => {
    const prices = [
      { currency: variant.currency, priceMinor: variant.priceMinor },
      ...(variant.prices ?? []),
    ];

    return prices.map((price) => ({
      "@type": "Offer",
      url,
      price: priceString(price.priceMinor),
      priceCurrency: price.currency,
      availability: variant.soldOut
        ? "https://schema.org/OutOfStock"
        : product.preorderable
          ? "https://schema.org/PreOrder"
          : "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      ...(product.variants.length > 1 ? { name: variant.name } : {}),
    }));
  });

  const info = product.info;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    url,
    ...(images.length ? { image: images } : {}),
    description:
      info?.longDescription ?? product.description ?? undefined,
    brand: { "@type": "Brand", name: info?.brand ?? SITE_NAME },
    ...(info?.infoCategory ? { category: info.infoCategory } : {}),
    ...(info?.sku ? { sku: info.sku } : {}),
    ...(info?.manufacturer
      ? { manufacturer: { "@type": "Organization", name: info.manufacturer } }
      : {}),
    ...(info?.countryOfOrigin
      ? { countryOfOrigin: info.countryOfOrigin }
      : {}),
    ...(info?.weightValue && info?.weightUnit
      ? {
          weight: {
            "@type": "QuantitativeValue",
            value: info.weightValue,
            unitText: info.weightUnit,
          },
        }
      : {}),
    ...(info?.warrantyMonths
      ? {
          warranty: {
            "@type": "WarrantyPromise",
            durationOfWarranty: {
              "@type": "QuantitativeValue",
              value: info.warrantyMonths,
              unitCode: "MON",
            },
          },
        }
      : {}),
    ...(() => {
      const properties = [
        ...(info?.specs ?? []).map((spec) => ({
          "@type": "PropertyValue",
          name: spec.label,
          value: [spec.value, spec.unit].filter(Boolean).join(" ").trim(),
        })),
        ...(info?.highlights ?? []).map((highlight) => ({
          "@type": "PropertyValue",
          name: "Highlight",
          value: highlight,
        })),
      ].filter((property) => property.name && property.value);

      return properties.length ? { additionalProperty: properties } : {};
    })(),
    ...(offers.length ? { offers } : {}),
    // Only emit ratings the store actually has. Google penalises review markup
    // that is not visible on the page.
    ...(product.reviews?.count && product.reviews.count > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.reviews.average,
            reviewCount: product.reviews.count,
          },
        }
      : {}),
  };
}

export function breadcrumbSchema(trail: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl()}${crumb.path}`,
    })),
  };
}
