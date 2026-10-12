import type { Metadata } from "next";
import { Faculty_Glyphic } from "next/font/google";
import Script from "next/script";
import { CartProvider } from "@/components/cart-provider";
import { CookieNotice } from "@/components/cookie-notice";
import { PreviewNotice } from "@/components/preview-notice";
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
  ...(indexingAllowed() ? {} : { robots: { index: false, follow: false } }),
  openGraph: {
    siteName: "Ahumma",
    type: "website",
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
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={facultyGlyphic.variable}
    >
      <body>
        <CartProvider checkoutEnabled={hasFrontdeskCheckout}>
          {children}
        </CartProvider>
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
