"use client";

import { useEffect } from "react";

/**
 * Reveals [data-reveal] elements as they approach the viewport.
 *
 * The hidden state only exists when <html data-reveal-ready> is set by the
 * pre-hydration script, so this hook is pure decoration — if it never runs,
 * or the visitor prefers reduced motion, the page still reads correctly.
 *
 * An IntersectionObserver alone is not enough: jumping (an anchor link, the
 * End key, a restored scroll position) moves past elements that were never
 * sampled as intersecting, which would leave them stuck invisible. So a cheap
 * rAF-throttled scroll sweep reveals anything the viewport has already
 * reached, and both stop once every element is done.
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!els.length) return;

    const pending = new Set(els);
    const reveal = (el: HTMLElement) => {
      el.dataset.in = "true";
      pending.delete(el);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            reveal(e.target as HTMLElement);
            io.unobserve(e.target);
          }
        }
      },
      // Generous bottom margin: an element is revealed shortly before it
      // scrolls into view, so fast scrolling never lands on a blank screen.
      { threshold: 0, rootMargin: "0px 0px 20% 0px" },
    );

    let frame = 0;
    const sweep = () => {
      frame = 0;
      const limit = window.innerHeight * 1.2;
      for (const el of Array.from(pending)) {
        if (el.getBoundingClientRect().top < limit) {
          reveal(el);
          io.unobserve(el);
        }
      }
      if (!pending.size) teardown();
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sweep);
    };

    const teardown = () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    els.forEach((el) => io.observe(el));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    sweep(); // catch whatever is already in view on load

    return teardown;
  }, []);
}
