"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

export function ProductCarousel({ children }: { children: ReactNode }) {
  const carouselRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={carouselRef}
      className="product-grid top-products-grid"
      role="region"
      aria-label="Top products"
    >
      {children}
    </div>
  );
}
