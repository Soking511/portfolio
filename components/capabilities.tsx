"use client";

import { useT } from "@/components/lang/provider";
import { SectionHead } from "@/components/section-head";
import { FEATURED } from "@/lib/projects";
import { workPath } from "@/lib/i18n";
import { trackAttrs } from "@/lib/analytics";

/**
 * What I can build, all of it on show at once: each service is its name, one
 * line saying what it means, and the projects where I did it, each a link to
 * that project's story. The claim is never more than a click from its proof.
 *
 * Nothing opens or closes. This used to be a list opened one item at a time,
 * and opening one closed the one above it, so the item just clicked jumped
 * hundreds of pixels away from the pointer. Six short entries read faster
 * laid out than hidden. The tools follow as four short columns.
 */
export function Capabilities() {
  const { t, lang } = useT();
  const C = t.capabilities;

  // A featured project has its own page; the others are entries further up
  // this page.
  const hrefFor = (anchor: string) =>
    FEATURED.some((m) => m.slug === anchor) ? workPath(lang, anchor) : `#${anchor}`;

  return (
    <section id="skills" className="section section--surface" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead id="skills-title" title={C.title} intro={C.intro} />

        <ul className="svc-grid">
          {C.items.map((it) => (
            <li key={it.title} className="svc">
              <h3 className="h3 svc__title">{it.title}</h3>
              <p className="svc__body">{it.body}</p>
              <div className="svc__proof">
                <span className="svc__label">{C.proof_label}</span>
                <ul aria-label={`${C.proof_label}: ${it.title}`}>
                  {it.proof.map(([label, anchor]) => (
                    <li key={anchor}>
                      <a
                        href={hrefFor(anchor)}
                        className="link tap latin"
                        {...trackAttrs("service_proof", { project: anchor })}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

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
