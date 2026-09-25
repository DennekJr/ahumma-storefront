"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  "My skin has never felt this cared for. Ahumma has made body care feel like a ritual I look forward to.",
  "The texture is beautiful, and my skin still feels soft hours later. It has become part of my evening ritual.",
  "A little goes a long way, and the scent makes the whole routine feel special without being overwhelming.",
  "Ahumma feels considered from the first touch. It is body care that feels generous, calm and genuinely luxurious.",
  "My skin feels nourished, never heavy. I keep reaching for it every day.",
  "The kind of body care that turns an ordinary shower into a moment to slow down and enjoy.",
  "The Dream Whip texture melts in beautifully. My skin looks healthier and feels incredibly soft.",
  "A simple, beautiful ritual that makes caring for my skin feel like something I get to do.",
];

export function TestimonialCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

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
    const observer = new ResizeObserver(updateControls);
    observer.observe(element);
    requestAnimationFrame(updateControls);

    return () => {
      element.removeEventListener("scroll", updateControls);
      window.removeEventListener("resize", updateControls);
      observer.disconnect();
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
    <div className="testimonial-carousel">
      <div className="testimonial-carousel__controls">
        <p className="testimonial-carousel__intro">
          Words from the Ahumma circle.
        </p>
        <button
          type="button"
          aria-label="Previous testimonial"
          disabled={!canScrollPrev}
          onClick={() => scrollBySlide(-1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m15 5-7 7 7 7" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next testimonial"
          disabled={!canScrollNext}
          onClick={() => scrollBySlide(1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </div>
      <div
        ref={carouselRef}
        className="testimonial-carousel__track"
        role="region"
        aria-label="Ahumma customer testimonials"
      >
        {testimonials.map((testimonial, index) => (
          <article className="footer-testimonial" key={testimonial}>
            <blockquote>
              <svg
                className="footer-testimonial__quote-mark"
                viewBox="0 0 48 40"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M0 40V23.5C0 8.5 7.7 1.3 23.2 0v8.7C15.4 10 11.5 14.2 10.3 21H20v19H0Zm28 0V23.5C28 8.5 35.7 1.3 51.2 0v8.7C43.4 10 39.5 14.2 38.3 21H48v19H28Z" />
              </svg>
              <p>{testimonial}</p>
            </blockquote>
            <div className="footer-testimonial__image">
              <Image
                src="/images/dream-whip.jpg"
                alt="Ahumma Dream Whip body butter"
                fill
                sizes="(max-width: 780px) 100vw, 42.5vw"
                priority={index === 0}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
