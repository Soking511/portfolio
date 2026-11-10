"use client";

import { useT } from "@/components/lang/provider";
import { SectionHead } from "@/components/section-head";

/**
 * What I can build, in words a non-engineer can follow. Each item names the
 * projects that show it as plain links, so the claim is never more than a
 * click from its proof. The tools follow as a small table.
 *
 * The section's name stays beside the list while it is read. Plain rows, not
 * cards or icon tiles: quiet text is easier on the eye.
 */
export function Capabilities() {
  const { t } = useT();
  const C = t.capabilities;

  return (
    <section id="skills" className="section section--surface" aria-labelledby="skills-title">
      <div className="container split">
        <div className="split__head">
          <SectionHead id="skills-title" title={C.title} intro={C.intro} />
        </div>

        <div>
          <ul className="services">
            {C.items.map((it) => (
              <li key={it.title} className="service">
                <h3 className="h3">{it.title}</h3>
                <p>{it.body}</p>
                <p className="service__proof">
                  {C.proof_label}:{" "}
                  {it.proof.map(([label, anchor], i) => (
                    <span key={anchor}>
                      {i > 0 && ", "}
                      <a href={`#${anchor}`} className="latin">
                        {label}
                      </a>
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ul>

          <div className="stack">
            <h3 className="label" id="stack-title">
              {C.stack_label}
            </h3>
            <dl className="stack-table" aria-labelledby="stack-title">
              {C.stack.map(([area, tools]) => (
                <div key={area}>
                  <dt>{area}</dt>
                  <dd className="latin">{tools}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
