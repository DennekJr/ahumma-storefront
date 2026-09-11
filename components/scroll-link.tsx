"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

type ScrollLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

/**
 * An in-page link that scrolls without writing a hash to the URL.
 *
 * Two problems with a plain hash link. The hash lingers in the address bar,
 * and — because the browser only acts when the hash *changes* — a second click
 * on a link pointing at the hash already in the URL does nothing at all. Click
 * "Build your ritual", scroll away, click "Shop now", and the page sits still.
 *
 * Falls back to ordinary navigation when the target is not on this page, so the
 * same component works in the shared header and footer where the link has to
 * reach the homepage from elsewhere. Modifier-clicks are left alone so
 * open-in-new-tab keeps working, and the scroll behaviour is left to CSS, which
 * already switches to instant under prefers-reduced-motion.
 */
export function ScrollLink({
  href,
  onClick,
  children,
  ...rest
}: ScrollLinkProps) {
  const targetId = href.includes("#") ? href.split("#")[1] : "";

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (event.defaultPrevented || !targetId) return;

    // Leave cmd/ctrl/shift-click and middle-click to the browser.
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const target = document.getElementById(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ block: "start" });
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
