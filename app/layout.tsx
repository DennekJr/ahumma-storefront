import type { Metadata } from "next";
import Script from "next/script";
import { CartProvider } from "@/components/cart-provider";
import { hasFrontdeskCheckout } from "@/lib/frontdesk";
import "./globals.css";

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
    default: "Ahumma — Plant-powered body care",
    template: "%s — Ahumma",
  },
  description:
    "Considered body care made in Lagos with African botanicals for softer, nourished and radiant skin.",
  metadataBase: getMetadataBase(),
  openGraph: {
    title: "Ahumma — At the edge of everything beautiful is you",
    description: "Plant-powered body care, made in Lagos.",
    images: ["/images/skin-closeup.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <CartProvider checkoutEnabled={hasFrontdeskCheckout}>{children}</CartProvider>
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
