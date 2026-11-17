"use client";

import { useRef } from "react";
import { useT } from "@/components/lang/provider";
import { SectionHead } from "@/components/section-head";
import { workPath } from "@/lib/i18n";
import { trackAttrs } from "@/lib/analytics";
import { MOTION, drawInOrder, gsap, useGSAP } from "@/lib/gsap";

/**
 * How I work, written for the person hiring, not for another engineer.
 *
 * First the thing a client asks: what happens after I say yes? Four numbered
 * steps, each with a name and a sentence saying what happens and what they
 * get from it. The numbers follow the page's language.
 *
 * Then what they can expect: three standards in plain professional terms,
 * each with a link to the case study that shows it, so none of them is only
 * a claim. These replaced
 * three slogans ("Correct beats clever", "Buy the hard parts") that a
 * visitor had to decode.
 *
 * The rule over each step is drawn in order as the steps are scrolled
 * through. Nothing else here moves, and no text is dimmed while it waits.
 */
export function Principles() {
  const { t, lang } = useT();
  const P = t.principles;
  const digits = new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en");

  const stepsRef = useRef<HTMLOListElement>(null);
  useGSAP(() => {
    const steps = stepsRef.current;
    if (!steps) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION, () => {
      drawInOrder(steps, Array.from(steps.children) as HTMLElement[]);
    });
  }, []);

  return (
    <section id="how" className="section" aria-labelledby="how-title">
      <div className="container">
        <SectionHead id="how-title" title={P.title} intro={P.intro} />

        <div className="process">
          <h3 className="h3" id="process-title">
            {P.process_title}
          </h3>
          <ol className="steps" aria-labelledby="process-title" ref={stepsRef}>
            {P.steps.map((step, i) => (
              <li key={step.title} className="step">
                <span className="step__n" aria-hidden="true">
                  {digits.format(i + 1)}
                </span>
                <div className="step__text">
                  <h4 className="step__title">{step.title}</h4>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="promises">
          <h3 className="h3" id="promises-title">
            {P.promises_title}
          </h3>
          <ul className="beliefs" aria-labelledby="promises-title">
            {P.items.map((it) => (
              <li key={it.title} className="belief">
                <h4 className="belief__title">{it.title}</h4>
                <p>{it.body}</p>
                <p className="belief__anchor">
                  <a
                    href={workPath(lang, it.slug)}
                    className="link tap"
                    {...trackAttrs("promise_proof", { project: it.slug })}
                  >
                    {it.anchor}
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
