import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/google-analytics";

/**
 * Google Analytics 4, loaded directly with gtag.js.
 *
 * Google's snippet, kept verbatim so Tag Assistant recognises it. It shares
 * `dataLayer` with Google Tag Manager, which is safe: both create the array
 * only if it does not already exist. GA4 is not also configured inside the
 * GTM container — that container fires no GA4 tag — so this is the only place
 * page views are counted, and nothing is sent twice.
 *
 * As with GTM, no page views are pushed on client-side navigation. GA4's
 * enhanced measurement listens for pushState, which is how Next.js navigates,
 * and pushing a page_view here as well would count every navigation twice.
 * That relies on "Page changes based on browser history events" being on in
 * the GA4 web stream, which is the default.
 */
export function GoogleAnalytics() {
  return (
    <>
      <Script
        id="google-analytics-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${GA_MEASUREMENT_ID}');
`,
        }}
      />
    </>
  );
}
