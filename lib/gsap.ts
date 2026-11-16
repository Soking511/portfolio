import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * GSAP, set up once. Every component takes it from here, so the plugins are
 * registered before anything runs.
 *
 * The rules for using it are DESIGN.md's rules for motion:
 *
 * - The page is complete without it. The stylesheet draws every element in
 *   its finished state; GSAP only ever starts from somewhere else and comes
 *   back to that. No content waits on it.
 * - Every tween is created inside `gsap.matchMedia()` under MOTION (or a
 *   narrower query), so nothing runs under reduced motion and everything is
 *   undone if the preference changes.
 * - Scroll motion is scrubbed, never triggered: it moves as far as the page
 *   has moved and moves back with it. Nothing plays on a timer because a
 *   section came into view.
 * - Tweens live in `useGSAP`, which reverts them when the component leaves.
 */
gsap.registerPlugin(ScrollTrigger, useGSAP);

// A phone's address bar slides away as the page is scrolled, which changes
// the window's height mid-scroll. Measuring everything again each time would
// make scrubbed motion jump under the thumb, so those resizes are ignored.
if (typeof window !== "undefined") ScrollTrigger.config({ ignoreMobileResize: true });

/** The condition every tween runs under. */
export const MOTION = "(prefers-reduced-motion: no-preference)";
/** Tablet and up: the layouts that are not a single phone column. */
export const MOTION_WIDE = `(min-width: 720px) and ${MOTION}`;
/** Phones: one column, and the projects as a row to swipe. */
export const MOTION_PHONE = `(max-width: 719px) and ${MOTION}`;

/** The site's one easing, as near as GSAP's own names get to `--ease`. */
export const EASE = "power3.out";

/** For a handler that has to know before it tweens. */
export const motionAllowed = () => typeof window !== "undefined" && window.matchMedia(MOTION).matches;

/**
 * Draws a sequence in order as it is scrolled through: each item's rule runs
 * from 0 to 1 in turn, the first finishing before the second starts. The
 * stylesheet reads `--draw` (1 by default, so the rules are whole without
 * this) and decides what "drawn" looks like.
 */
export function drawInOrder(list: HTMLElement, items: HTMLElement[]) {
  // Side by side, the items come into view together, so the drawing takes a
  // fixed stretch of scroll. Stacked, they come into view one at a time, so
  // it lasts as long as the list does and each is drawn as it arrives.
  const inOneRow = () => items.length < 2 || items[0].offsetTop === items[items.length - 1].offsetTop;
  return gsap.fromTo(
    items,
    { "--draw": 0 },
    {
      "--draw": 1,
      ease: "none",
      duration: 1,
      stagger: 1,
      scrollTrigger: {
        trigger: list,
        start: "top 88%",
        // A function, so it is asked again whenever the layout is measured.
        end: () => (inOneRow() ? "top 55%" : "bottom 72%"),
        scrub: 0.4,
      },
    },
  );
}

export { gsap, ScrollTrigger, useGSAP };
