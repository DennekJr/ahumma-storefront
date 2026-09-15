"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

export function ProductCarousel({ children }: { children: ReactNode }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let carousel: { init: () => void; destroy: () => void } | undefined;

    void import("@blossom-carousel/core").then(({ Blossom }) => {
      if (cancelled || !carouselRef.current) return;

      carousel = Blossom(carouselRef.current, {});
      carousel.init();
    });

    return () => {
      cancelled = true;
      carousel?.destroy();
    };
  }, []);

  useEffect(() => {
    const element = carouselRef.current;
    if (!element) return;

    const updateControls = () => {
      setCanScrollPrev(element.scrollLeft > 1);
      setCanScrollNext(
        element.scrollLeft < element.scrollWidth - element.clientWidth - 1,
      );
    };

    updateControls();
    element.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", updateControls);

    return () => {
      element.removeEventListener("scroll", updateControls);
      window.removeEventListener("resize", updateControls);
    };
  }, []);

  function scrollBySlide(direction: -1 | 1) {
    const element = carouselRef.current;
    const slide = element?.firstElementChild;
    if (!element || !(slide instanceof HTMLElement)) return;

    const gap = Number.parseFloat(getComputedStyle(element).gap) || 0;
    element.scrollBy({
      left: direction * (slide.offsetWidth + gap),
      behavior: "smooth",
    });
  }

  return (
    <div className="product-carousel">
      <div
        ref={carouselRef}
        className="product-grid top-products-grid"
        role="region"
        aria-label="Top products"
      >
        {children}
      </div>
      <div className="product-carousel__controls">
        <button
          type="button"
          aria-label="Previous products"
          disabled={!canScrollPrev}
          onClick={() => scrollBySlide(-1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m15 5-7 7 7 7" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next products"
          disabled={!canScrollNext}
          onClick={() => scrollBySlide(1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
