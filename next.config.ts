import type { NextConfig } from "next";

// Addresses from the old WordPress/WooCommerce site that Google still has
// indexed. Each one is sent permanently to its nearest page here so the
// ranking it earned carries over instead of ending in a 404. Order matters:
// the first match wins, so specific products sit above the catch-alls.
const legacyRedirects = [
  // Products (WooCommerce used /product/<slug>)
  ["/product/:slug(.*sika.*)", "/products/sika-body-butter"],
  ["/product/:slug(.*dream.*)", "/products/dream-whip-250g"],
  ["/product/:slug(.*baby.*|.*bloom.*)", "/products/baby-bloom-100g"],
  ["/product/:slug(ara.*|.*soap.*)", "/products/ara-500ml"],
  ["/product/:slug*", "/shop"],
  ["/product-category/:path*", "/shop"],
  ["/product-tag/:path*", "/shop"],
  ["/cart", "/shop"],
  ["/checkout", "/shop"],
  ["/my-account/:path*", "/shop"],
  ["/wishlist", "/shop"],

  // Blog and its archives. The tips now live in the FAQ.
  ["/our-blog/:path*", "/faq"],
  ["/blog/:path*", "/faq"],
  ["/category/:path*", "/faq"],
  ["/tag/:path*", "/faq"],
  ["/author/:path*", "/faq"],
  ["/:year(\\d{4})/:path*", "/faq"],

  // Info pages
  ["/about", "/faq#about-ahumma"],
  ["/about-us", "/faq#about-ahumma"],
  ["/our-story", "/faq#about-ahumma"],
  ["/contact", "/faq#shipping"],
  ["/contact-us", "/faq#shipping"],
  ["/delivery", "/faq#shipping"],
  ["/shipping", "/faq#shipping"],
  ["/shipping-policy", "/faq#shipping"],
  ["/return-cancellations", "/faq#shipping"],
  ["/refund_returns", "/faq#shipping"],
  ["/privacy-policy", "/privacy"],
  ["/feed", "/"],
  ["/page/:n(\\d+)", "/"],
] as const;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.frontdesk.africa",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/frontdesk-uploads/**",
      },
    ],
  },
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
