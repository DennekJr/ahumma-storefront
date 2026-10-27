import Script from "next/script";
import { GTM_CONTAINER_ID } from "@/lib/google-tag-manager";

/**
 * Google Tag Manager.
 *
 * The loader is Google's own snippet, kept verbatim so Tag Assistant recognises
 * it — it seeds `dataLayer`, records the container start time and appends
 * gtm.js.
 *
 * Unlike the Meta Pixel, no page views are pushed from here. What counts as a
 * page view is decided inside the container, and a container that already has a
 * History Change trigger would count every client-side navigation twice if this
 * pushed one as well. Next.js navigates with pushState, which that trigger
 * listens for, so SPA page views are configured in GTM rather than in code.
 */
export function GoogleTagManager() {
  return (
    <Script
      id="google-tag-manager"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
`,
      }}
    />
  );
}

/**
 * The no-JavaScript fallback. Google requires this immediately after the
 * opening <body> tag, so it is rendered separately from the loader above.
 */
export function GoogleTagManagerNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
