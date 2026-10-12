import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { CURRENCY_COOKIE, initialCurrency } from "@/lib/currency";
import Script from "next/script";
import { CartProvider } from "@/components/cart-provider";
import {
  GoogleTagManager,
  GoogleTagManagerNoScript,
} from "@/components/google-tag-manager";
import { GoogleAnalytics } from "@/components/google-analytics";
import { MetaPixel } from "@/components/meta-pixel";
import { hasFrontdeskCheckout } from "@/lib/frontdesk";
import { siteUrl } from "@/lib/structured-data";
import { indexingAllowed } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ahumma — Body care for Black and brown skin",
    template: "%s — Ahumma",
  },
  description:
    "A Nigerian-born premium body-care brand for Black and brown skin. Whipped body butters and liquid African black soap, rooted in African heritage.",
  metadataBase: new URL(siteUrl()),
  ...(indexingAllowed()
    ? {}
    : { robots: { index: false, follow: false } }),
  // Site-ownership verification for third-party platforms. Each entry renders
  // as <meta name="…" content="…"> in the server HTML, where their crawlers
  // look for it.
  verification: {
    other: {
      "p:domain_verify": "2811b7a75a38be9624e76e12f7be2f33", // Pinterest
    },
  },
  openGraph: {
    siteName: "Ahumma",
    type: "website",
    title: "Ahumma — At the edge of everything beautiful is you",
    description: "Premium body butters and liquid African black soap, rooted in Africa and made for the world.",
    images: ["/images/skin-closeup.jpg"],
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Reading the request makes every page render per visit rather than from a
  // static build. That is the point: a static page would show one currency to
  // everyone. Responses are already private and uncached, so one visitor's
  // currency can never be served to another.
  const [cookieStore, requestHeaders] = await Promise.all([cookies(), headers()]);
  const currency = initialCurrency(
    cookieStore.get(CURRENCY_COOKIE)?.value,
    // Set by Vercel on every request from the visitor's IP; absent locally.
    requestHeaders.get("x-vercel-ip-country"),
  );

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <GoogleTagManagerNoScript />
        <CartProvider checkoutEnabled={hasFrontdeskCheckout} initialCurrency={currency}>
          {children}
        </CartProvider>
        <GoogleTagManager />
        <GoogleAnalytics />
        <MetaPixel />
        <Script
          id="frontdesk-chat-widget"
          src="https://widget.frontdesk.africa/widget.js"
          data-key="fd_w_ToVEk9AiYdvvrndUGXLfZ5LC"
          strategy="afterInteractive"
          async
        />
      </body>
    </html>
  );
}
