"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * The travelling full stop.
 *
 * Nearly every Ahumma heading ends on a full stop ("…for Black and Brown
 * Skin.", "We started with a belief."). A single rose dot sits on the full
 * stop of the heading nearest the middle of the screen, and as the reader
 * scrolls it hops to the next one in a small arc and lands with a ripple.
 * Any line set in the serif at 18px or more that ends on a full stop counts:
 * headings and subheadings, the closing line, the mantra, product ledes, and
 * numerals such as the About page's "I." "II." "III.".
 *
 * Nothing in the headings changes: each full stop is located with a Range
 * over its last character, and the glyph's ink is measured with canvas text
 * metrics, so the dot covers the printed stop exactly at any size. It only
 * runs a frame while the page scrolls or the dot is in flight, and it stays
 * off for readers who prefer reduced motion.
 */

type Anchor = {
  el: HTMLElement;
  node: Text;
  offset: number;
  metrics?: { x: number; y: number; size: number };
};

type Point = { x: number; y: number; k: number };

const DOT = 14; // px; the dot's own size before scaling

const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

function findAnchors(): Anchor[] {
  const anchors: Anchor[] = [];
  const candidates = document.querySelectorAll<HTMLElement>(
    "main :is(h1, h2, h3, h4, p, span, strong, b, em, div, li, dt, dd), footer :is(h2, p)",
  );

  for (const el of candidates) {
    if (el.closest("dialog, nav, [aria-hidden='true'], .sr-only")) continue;
    if (!el.textContent?.trim().endsWith(".")) continue;

    // The full stop is the last non-space character of the last text node,
    // and it must be the element's own text, so a wrapper and the line
    // inside it never both count.
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let last: Text | null = null;
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (node.textContent?.trim()) last = node as Text;
    }
    if (!last || last.parentNode !== el) continue;

    const style = getComputedStyle(el);
    if (!/glyphic/i.test(style.fontFamily)) continue;
    if (parseFloat(style.fontSize) < 18) continue;
    const offset = last.data.trimEnd().length - 1;
    if (last.data[offset] !== ".") continue;

    anchors.push({ el, node: last, offset });
  }

  return anchors;
}

/** Where the full stop's ink sits relative to its character box. */
function measure(anchor: Anchor, context: CanvasRenderingContext2D) {
  if (anchor.metrics) return anchor.metrics;
  const style = getComputedStyle(anchor.el);
  context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  const m = context.measureText(".");
  const fontSize = parseFloat(style.fontSize);
  const ascent = m.fontBoundingBoxAscent || fontSize * 0.92;
  const left = m.actualBoundingBoxLeft || 0;
  const right = m.actualBoundingBoxRight || fontSize * 0.12;
  const inkTop = m.actualBoundingBoxAscent || fontSize * 0.12;
  const inkBottom = m.actualBoundingBoxDescent || 0;

  anchor.metrics = {
    x: (right - left) / 2,
    y: ascent + (inkBottom - inkTop) / 2,
    size: Math.max(left + right, inkTop + inkBottom),
  };
  return anchor.metrics;
}

export function FullStop() {
  const dotRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = document.createElement("canvas").getContext("2d");
    if (!context) return;
    const range = document.createRange();

    let anchors: Anchor[] = [];
    let held: Anchor | null = null;
    let current: Point | null = null;
    let flight: {
      from: Point;
      to: Anchor;
      start: number;
      duration: number;
      lift: number;
    } | null = null;
    let frame = 0;
    let disposed = false;

    function point(anchor: Anchor): Point | null {
      if (!anchor.node.isConnected) return null;
      range.setStart(anchor.node, anchor.offset);
      range.setEnd(anchor.node, anchor.offset + 1);
      const rects = range.getClientRects();
      const box = rects[rects.length - 1];
      if (!box || (!box.width && !box.height)) return null;
      const ink = measure(anchor, context!);
      return {
        x: box.left + ink.x,
        y: box.top + ink.y,
        k: Math.max(0.45, Math.min(1.6, (ink.size * 1.25) / DOT)),
      };
    }

    function place(p: Point, opacity = 1) {
      current = p;
      dot!.style.transform = `translate3d(${p.x - DOT / 2}px, ${p.y - DOT / 2}px, 0) scale(${p.k})`;
      dot!.style.opacity = String(opacity);
    }

    function ripple(p: Point) {
      const ring = document.createElement("span");
      ring.className = "full-stop-ripple";
      ring.innerHTML = "<i></i><i></i>";
      ring.style.left = `${p.x + scrollX}px`;
      ring.style.top = `${p.y + scrollY}px`;
      ring.style.setProperty("--size", `${Math.max(36, p.k * 64)}px`);
      document.body.appendChild(ring);
      window.setTimeout(() => ring.remove(), 1300);
      dot!.classList.remove("is-landing");
      void dot!.offsetWidth;
      dot!.classList.add("is-landing");
    }

    /**
     * The full stop nearest the middle of the screen. Stops that share a
     * line (the About page's "I." "II." "III." side by side) are taken left
     * to right as that line scrolls up through the middle.
     */
    function nearest() {
      const middle = innerHeight / 2;
      const inView: { anchor: Anchor; p: Point }[] = [];
      let best: { anchor: Anchor; p: Point } | null = null;
      for (const anchor of anchors) {
        const p = point(anchor);
        if (!p || p.y < innerHeight * 0.15 || p.y > innerHeight * 0.85) continue;
        // Off to the side, e.g. a review further along a carousel.
        if (p.x < 0 || p.x > innerWidth) continue;
        inView.push({ anchor, p });
        if (!best || Math.abs(p.y - middle) < Math.abs(best.p.y - middle)) {
          best = { anchor, p };
        }
      }
      if (!best) return null;

      const row = inView
        .filter(({ p }) => Math.abs(p.y - best.p.y) < 8)
        .sort((a, b) => a.p.x - b.p.x);
      if (row.length < 2) return best.anchor;
      const progress = Math.min(
        0.999,
        Math.max(0, (innerHeight * 0.7 - best.p.y) / (innerHeight * 0.4)),
      );
      return row[Math.floor(progress * row.length)].anchor;
    }

    function fly(to: Anchor) {
      const target = point(to);
      if (!target) return;
      if (!current) {
        held = to;
        place(target);
        ripple(target);
        return;
      }
      const from = {
        x: current.x + scrollX,
        y: current.y + scrollY,
        k: current.k,
      };
      const distance = Math.hypot(
        target.x + scrollX - from.x,
        target.y + scrollY - from.y,
      );
      held = null;
      flight = {
        from,
        to,
        start: performance.now(),
        duration: Math.max(450, Math.min(1100, 380 + distance * 0.4)),
        lift: Math.min(140, distance * 0.28),
      };
    }

    function tick(now: number) {
      frame = 0;
      if (disposed) return;

      const next = nearest();
      const goal = flight?.to ?? held;
      if (next && next !== goal) fly(next);

      if (flight) {
        const target = point(flight.to);
        if (!target) {
          flight = null;
        } else {
          const t = Math.min(1, (now - flight.start) / flight.duration);
          const e = ease(t);
          const { from, lift } = flight;
          place({
            x: from.x + (target.x + scrollX - from.x) * e - scrollX,
            y:
              from.y +
              (target.y + scrollY - from.y) * e -
              Math.sin(Math.PI * t) * lift -
              scrollY,
            k: from.k + (target.k - from.k) * e,
          });
          if (t < 1) {
            frame = requestAnimationFrame(tick);
            return;
          }
          held = flight.to;
          flight = null;
          ripple(target);
        }
      } else if (held) {
        const p = point(held);
        if (p) place(p);
        else {
          held = null;
          dot!.style.opacity = "0";
        }
      } else if (!anchors.length) {
        dot!.style.opacity = "0";
      }
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const remeasure = () => {
      for (const anchor of anchors) anchor.metrics = undefined;
      schedule();
    };

    // Headings change with the route; wait for the page and its fonts.
    const start = window.setTimeout(() => {
      void document.fonts.ready.then(() => {
        if (disposed) return;
        anchors = findAnchors();
        if (held && !anchors.includes(held)) held = null;
        schedule();
      });
    }, 60);

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", remeasure);

    return () => {
      disposed = true;
      window.clearTimeout(start);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
    };
  }, [pathname]);

  return <i ref={dotRef} className="full-stop" aria-hidden="true" />;
}
