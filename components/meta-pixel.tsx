"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { META_PIXEL_ID } from "@/lib/meta-pixel";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Meta (Facebook) Pixel.
 *
 * The loader below is Meta's own snippet, kept verbatim so the Pixel Helper
 * recognises it — it defines `fbq`, pulls in fbevents.js and reports the
 * PageView for the page the visitor landed on.
 *
 * That snippet alone under-reports here. This is a single-page app: moving from
 * the homepage to a product never reloads the document, so the snippet runs
 * once per session and every later page goes unrecorded. The effect closes that
 * gap by reporting a PageView on each client-side navigation, skipping the
 * landing path because the snippet has already counted it.
 */
export function MetaPixel() {
  const pathname = usePathname();
  const trackedPath = useRef(pathname);

  useEffect(() => {
    // Also makes this safe under the double-invoked effects of Strict Mode.
    if (trackedPath.current === pathname) return;

    trackedPath.current = pathname;
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');
`,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
