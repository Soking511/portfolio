"use client";

import { useT } from "@/components/lang/provider";
import { SectionHead } from "@/components/section-head";
import { NextLink } from "@/components/next-link";

/**
 * What I can build, in words a non-engineer can follow. Each item names the
 * projects that show it as plain links, so the claim is never more than a
 * click from its proof. The tools follow as a small table.
 *
 * Plain columns, not cards or icon tiles: quiet text is easier on the eye.
 */
export function Capabilities() {
  const { t } = useT();
  const C = t.capabilities;

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead id="skills-title" title={C.title} intro={C.intro} />

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

        <dl className="stack-table" aria-label={C.stack_label}>
          {C.stack.map(([area, tools]) => (
            <div key={area}>
              <dt>{area}</dt>
              <dd className="latin">{tools}</dd>
            </div>
          ))}
        </dl>
        <NextLink href="#how" label={t.principles.title} />
      </div>
    </section>
  );
}
