import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { Faculty_Glyphic } from "next/font/google";
import Script from "next/script";
import { CartProvider } from "@/components/cart-provider";
import { CookieNotice } from "@/components/cookie-notice";
import { GoogleAnalytics } from "@/components/google-analytics";
import {
  GoogleTagManager,
  GoogleTagManagerNoScript,
} from "@/components/google-tag-manager";
import { MetaPixel } from "@/components/meta-pixel";
import { PreviewNotice } from "@/components/preview-notice";
import {
  CURRENCY_COOKIE,
  currencyIsLocked,
  initialCurrency,
} from "@/lib/currency";
import { hasFrontdeskCheckout, hasFrontdeskReads } from "@/lib/frontdesk";
import { siteUrl } from "@/lib/structured-data";
import { indexingAllowed } from "@/lib/seo";
import "@blossom-carousel/core/style.css";
import "./globals.css";

const facultyGlyphic = Faculty_Glyphic({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-faculty-glyphic",
  display: "swap",
});

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
    description:
      "Premium body butters and liquid African black soap, rooted in Africa and made for the world.",
    images: ["/images/skin-closeup.jpg"],
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Reading the request makes every page render per visit rather than from a
  // static build. That is the point: a static page would show one currency to
  // everyone. Responses are already private and uncached, so one visitor's
  // currency can never be served to another.
  const [cookieStore, requestHeaders] = await Promise.all([cookies(), headers()]);
  // Set by Vercel on every request from the visitor's IP; absent locally.
  const country = requestHeaders.get("x-vercel-ip-country");
  const currency = initialCurrency(
    cookieStore.get(CURRENCY_COOKIE)?.value,
    country,
  );

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={facultyGlyphic.variable}
    >
      <body>
        <GoogleTagManagerNoScript />
        <CartProvider
          checkoutEnabled={hasFrontdeskCheckout}
          initialCurrency={currency}
          currencyLocked={currencyIsLocked(country)}
        >
          {children}
        </CartProvider>
        <CookieNotice />
        <PreviewNotice visible={!hasFrontdeskReads} />
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
