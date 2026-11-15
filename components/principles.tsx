"use client";

import { useRef } from "react";
import { useT } from "@/components/lang/provider";
import { SectionHead } from "@/components/section-head";
import { MOTION, MOTION_DESKTOP, drawInOrder, gsap, useGSAP } from "@/lib/gsap";

/**
 * How I work: three beliefs as three tiles, each with the project that shows
 * it. Then how a project goes, as the four numbered steps it is; the
 * numbers follow the page's language.
 *
 * Both follow the scroll. The three tiles land one after another as the row
 * comes up, and the rule over each step is drawn in order as the steps are
 * scrolled through, each number lighting as its rule reaches it. Scroll back
 * and they undo.
 */
export function Principles() {
  const { t, lang } = useT();
  const P = t.principles;
  const digits = new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en");

  const beliefsRef = useRef<HTMLUListElement>(null);
  const stepsRef = useRef<HTMLOListElement>(null);
  useGSAP(() => {
    const beliefs = beliefsRef.current;
    const steps = stepsRef.current;
    if (!beliefs || !steps) return;
    const mm = gsap.matchMedia();
    // Only where the tiles are a row; stacked, they would just drift.
    mm.add(MOTION_DESKTOP, () => {
      gsap.fromTo(
        beliefs.children,
        { y: (i: number) => 24 + i * 36 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: { trigger: beliefs, start: "top bottom", end: "top 52%", scrub: 0.5 },
        },
      );
    });
    mm.add(MOTION, () => {
      drawInOrder(steps, Array.from(steps.children) as HTMLElement[]);
    });
  }, []);

  return (
    <section id="how" className="section" aria-labelledby="how-title">
      <div className="container">
        <SectionHead id="how-title" title={P.title} intro={P.intro} />

        <ul className="beliefs" aria-label={P.beliefs_label} ref={beliefsRef}>
          {P.items.map((it) => (
            <li key={it.title} className="belief">
              <h3 className="belief__title">{it.title}</h3>
              <p>{it.body}</p>
              <p className="belief__anchor">{it.anchor}</p>
            </li>
          ))}
        </ul>

        <div className="process">
          <h3 className="h3" id="process-title">
            {P.process_title}
          </h3>
          <ol className="steps" aria-labelledby="process-title" ref={stepsRef}>
            {P.steps.map((step, i) => (
              <li key={step} className="step">
                <span className="step__n" aria-hidden="true">
                  {digits.format(i + 1)}
                </span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
