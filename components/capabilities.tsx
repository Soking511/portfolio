"use client";

import { useT } from "@/components/lang/provider";
import { SectionHead } from "@/components/section-head";
import { FEATURED, SELECTED } from "@/lib/projects";
import { workPath } from "@/lib/i18n";
import { trackAttrs } from "@/lib/analytics";

/**
 * What I can build, in words a non-engineer can follow, as a list a visitor
 * opens one at a time: pick the thing you need, and it shows what it means
 * and the projects where I did it, each a link to that project's story. The
 * claim is never more than a tap from its proof.
 *
 * Native <details> sharing one name: the browser keeps a single item open
 * and it works without JavaScript. The first is open, so the section is
 * never a column of closed rows. The tools follow as four short columns.
 */
export function Capabilities() {
  const { t, lang } = useT();
  const C = t.capabilities;
  const W = t.works;

  // A proof names a project by its anchor: a featured one has its own page,
  // the others are entries further up this page.
  const proofFor = (anchor: string) => {
    const f = FEATURED.findIndex((m) => m.slug === anchor);
    if (f >= 0) return { href: workPath(lang, anchor), kicker: W.featured[f].kicker };
    const s = SELECTED.findIndex((m) => m.slug === anchor);
    return { href: `#${anchor}`, kicker: s >= 0 ? W.selected[s].kicker : "" };
  };

  return (
    <section id="skills" className="section section--surface" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead id="skills-title" title={C.title} intro={C.intro} />

        <div className="svc-list">
          {C.items.map((it, i) => (
            <details key={it.title} className="svc" name="services" open={i === 0}>
              <summary className="svc__name">
                <h3 className="h3">{it.title}</h3>
                <span className="svc__mark" aria-hidden="true" />
              </summary>
              <div className="svc__body">
                <p className="lead">{it.body}</p>
                <ul className="svc__proof" aria-label={C.proof_label}>
                  {it.proof.map(([label, anchor]) => {
                    const proof = proofFor(anchor);
                    return (
                      <li key={anchor}>
                        <a href={proof.href} {...trackAttrs("service_proof", { project: anchor })}>
                          <span className="svc__project latin">{label}</span>
                          <span className="svc__kicker">{proof.kicker}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </details>
          ))}
        </div>

        <dl className="stack-table" aria-label={C.stack_label}>
          {C.stack.map(([area, tools]) => (
            <div key={area}>
              <dt className="label">{area}</dt>
              <dd className="latin">{tools}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
