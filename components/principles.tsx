"use client";

import { useT } from "@/components/lang/provider";
import { SectionHead } from "@/components/section-head";

const TINTS = ["amber", "lilac", "mint"] as const;

/**
 * How I work: three beliefs, each on its own tint with the project that
 * shows it. Then how a project goes, said in one sentence.
 */
export function Principles() {
  const { t } = useT();
  const P = t.principles;
  const [processLead, ...processRest] = P.process.split(/:\s?/);

  return (
    <section id="how" className="section" aria-labelledby="how-title">
      <div className="container">
        <SectionHead id="how-title" title={P.title} intro={P.intro} />

        <ul className="beliefs" aria-label={P.beliefs_label}>
          {P.items.map((it, i) => (
            <li key={it.title} className={`belief tint-${TINTS[i % TINTS.length]}`}>
              <h3 className="belief__title">{it.title}</h3>
              <p>{it.body}</p>
              <p className="belief__anchor">{it.anchor}</p>
            </li>
          ))}
        </ul>

        <p className="process-line">
          <strong>{processLead}:</strong> {processRest.join(": ")}
        </p>
      </div>
    </section>
  );
}
