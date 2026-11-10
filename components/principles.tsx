"use client";

import { useT } from "@/components/lang/provider";
import { SectionHead } from "@/components/section-head";

/**
 * How I work: three beliefs as three tiles, each with the project that shows
 * it. Then how a project goes, as the four numbered steps it is; the
 * numbers follow the page's language.
 */
export function Principles() {
  const { t, lang } = useT();
  const P = t.principles;
  const digits = new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en");

  return (
    <section id="how" className="section" aria-labelledby="how-title">
      <div className="container">
        <SectionHead id="how-title" title={P.title} intro={P.intro} />

        <ul className="beliefs" aria-label={P.beliefs_label}>
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
          <ol className="steps" aria-labelledby="process-title">
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
