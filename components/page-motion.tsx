"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Site-wide motion, kept quiet: a cross-fade between pages and a soft rise as
 * content scrolls into view. Both stay off for readers who prefer reduced
 * motion, and browsers without view transitions simply navigate as before.
 */

// Blocks that rise into view as a unit. A block inside one already chosen
// moves with it, so nothing animates twice.
const REVEAL =
  "h2, h3, p, ul, ol, dl, blockquote, table, form, figure, video, article, .collection-card, .product-card, img[data-nimg], a[class], button[class]";

const SKIP =
  ".site-header, nav, dialog, [role='dialog'], [aria-hidden='true'], .sr-only, .card-hover-image";

const prefersReducedMotion = () =>
  matchMedia("(prefers-reduced-motion: reduce)").matches;

export function PageMotion() {
  const router = useRouter();
  const pathname = usePathname();
  const finishTransition = useRef<(() => void) | null>(null);

  // Page transitions. A click on an internal link to another page starts a
  // view transition and navigates inside it; the new page is shown once the
  // route has committed. Preventing the default stops Next's Link from
  // navigating a second time, while its own onClick handlers still run.
  useEffect(() => {
    if (!("startViewTransition" in document) || prefersReducedMotion()) return;

    function onClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const link = (event.target as Element | null)?.closest("a");
      if (!link || link.hasAttribute("download")) return;
      if (link.target && link.target !== "_self") return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) {
        return;
      }

      event.preventDefault();
      document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            finishTransition.current = resolve;
            router.push(url.pathname + url.search + url.hash);
            // Never hold the old page frozen on a slow route.
            window.setTimeout(resolve, 1500);
          }),
      );
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  useEffect(() => {
    finishTransition.current?.();
    finishTransition.current = null;
  }, [pathname]);

  // Scroll reveals. Only content that starts below the fold is hidden, so a
  // page never loads with anything missing.
  useEffect(() => {
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      // A small share in view, so even the last line of the page, which can
      // never scroll far up, still arrives.
      { threshold: 0.12 },
    );

    const start = window.setTimeout(() => {
      const main = document.querySelector("main");
      if (!main) return;
      const fold = innerHeight * 0.92;
      const chosen: HTMLElement[] = [];

      for (const candidate of main.querySelectorAll<HTMLElement>(REVEAL)) {
        // A fill image is revealed through the box that frames it, and
        // anything in a sideways carousel through the carousel itself, so
        // cards waiting off to the side are never left hidden.
        let el: HTMLElement | null =
          candidate.tagName === "IMG" && candidate.dataset.nimg === "fill"
            ? candidate.parentElement
            : candidate;
        for (let a = el?.parentElement; a && a !== main; a = a.parentElement) {
          const overflow = getComputedStyle(a).overflowX;
          if (/auto|scroll/.test(overflow) && a.scrollWidth > a.clientWidth) {
            el = a;
            break;
          }
        }
        // Full-bleed sections keep their composition; their parts rise.
        if (!el || el.tagName === "SECTION" || el === main) continue;
        if (el.hasAttribute("data-reveal")) continue;
        if (el.parentElement?.closest("[data-reveal]")) continue;
        if (el.closest(SKIP)) continue;

        const box = el.getBoundingClientRect();
        if (!box.width || !box.height || box.top < fold) continue;
        const style = getComputedStyle(el);
        if (style.animationName !== "none") continue;
        if (style.position === "fixed" || style.position === "sticky") continue;

        el.setAttribute("data-reveal", "");
        chosen.push(el);
      }

      // Siblings that arrive together follow one another.
      for (const el of chosen) {
        const siblings = Array.from(el.parentElement?.children ?? []).filter(
          (sibling) => sibling.hasAttribute("data-reveal"),
        );
        el.style.setProperty(
          "--reveal-step",
          String(Math.min(siblings.indexOf(el), 5)),
        );
        observer.observe(el);
      }
    }, 80);

    return () => {
      window.clearTimeout(start);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
