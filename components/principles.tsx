"use client";

import { useT } from "@/components/lang/provider";
import { SectionHead } from "@/components/section-head";
import { NextLink } from "@/components/next-link";

/**
 * How I work: three beliefs, each tied to a project the visitor has just
 * seen, then how a project goes, said in one sentence.
 */
export function Principles() {
  const { t } = useT();
  const P = t.principles;
  const [processLead, ...processRest] = P.process.split(/:\s?/);

  return (
    <section id="how" className="section section--surface" aria-labelledby="how-title">
      <div className="container">
        <SectionHead id="how-title" title={P.title} intro={P.intro} />

        <h3 className="label">{P.beliefs_label}</h3>
        <ul className="beliefs">
          {P.items.map((it) => (
            <li key={it.title} className="belief">
              <h4 className="h3">{it.title}</h4>
              <p className="soft">{it.body}</p>
              <p className="belief__anchor">{it.anchor}</p>
            </li>
          ))}
        </ul>

        <div className="how-split">
          <p className="process-line">
            <strong>{processLead}:</strong> {processRest.join(": ")}
          </p>
        </div>
        <NextLink href="#about" label={t.nav.items[2][0]} />
      </div>
    </section>
  );
}
