import type { Metadata } from "next";
import { MetaPixel } from "@/components/meta-pixel";
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/google-tag-manager";
import { Faculty_Glyphic } from "next/font/google";
import Script from "next/script";
import { CartProvider } from "@/components/cart-provider";
import { CookieNotice } from "@/components/cookie-notice";
import { PreviewNotice } from "@/components/preview-notice";
import { hasFrontdeskCheckout, hasFrontdeskReads } from "@/lib/frontdesk";
import { indexingAllowed } from "@/lib/seo";
import "@blossom-carousel/core/style.css";
import "./globals.css";

const facultyGlyphic = Faculty_Glyphic({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-faculty-glyphic",
});

function getMetadataBase() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configuredUrl) {
    try {
      return new URL(configuredUrl);
    } catch {
      // Fall through to a valid default when deployment configuration is malformed.
    }
  }

  return new URL("http://localhost:6543");
}

export const metadata: Metadata = {
  title: {
    default: "Ahumma — Body care for Black and brown skin",
    template: "%s — Ahumma",
  },
  description:
    "A Nigerian-born premium body-care brand for Black and brown skin. Whipped body butters and liquid African black soap, rooted in African heritage.",
  metadataBase: getMetadataBase(),
  ...(indexingAllowed() ? {} : { robots: { index: false, follow: false } }),
  openGraph: {
    title: "Ahumma — At the edge of everything beautiful is you",
    description:
      "Premium body butters and liquid African black soap, rooted in Africa and made for the world.",
    images: ["/images/skin-closeup.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={facultyGlyphic.variable} data-scroll-behavior="smooth">
      <body>
        <GoogleTagManagerNoScript />
        <CartProvider checkoutEnabled={hasFrontdeskCheckout}>
          {children}
        </CartProvider>
        <GoogleTagManager />
        <MetaPixel />
        <CookieNotice />
        <PreviewNotice visible={!hasFrontdeskReads} />
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
