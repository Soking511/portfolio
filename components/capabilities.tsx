"use client";

import { useT } from "@/components/lang/provider";
import { SectionHead } from "@/components/section-head";
import type { Capability } from "@/components/lang/strings";

/**
 * What I can build, in words a non-engineer can follow: six tiles, each an
 * icon, a name, one line, and the projects that show it as plain
 * links, so the claim is never more than a click from its proof. The tools
 * follow as four short columns.
 */
export function Capabilities() {
  const { t } = useT();
  const C = t.capabilities;

  return (
    <section id="skills" className="section section--surface" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead id="skills-title" title={C.title} intro={C.intro} />

        <ul className="services">
          {C.items.map((it) => (
            <li key={it.title} className="service">
              <span className="service__icon" aria-hidden="true">
                <Icon name={it.icon} />
              </span>
              <h3 className="h3">{it.title}</h3>
              <p className="soft">{it.body}</p>
              <p className="service__proof">
                {C.proof_label}:{" "}
                {it.proof.map(([label, anchor], j) => (
                  <span key={anchor}>
                    {j > 0 && ", "}
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
              <dt className="label">{area}</dt>
              <dd className="latin">{tools}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** One plain line icon per service, drawn on a 24px grid. */
const PATHS: Record<Capability["icon"], string> = {
  app: "M3.5 5.5h17v13h-17zM3.5 9.5h17M6.5 7.5h.01M9 7.5h.01",
  dashboard: "M4 20V11M10 20V4M16 20v-6M2.5 20h19",
  realtime: "M13 2.5L4.5 13.5h6.5l-1 8 8.5-11H12z",
  payments: "M2.5 6h19v12h-19zM2.5 10h19M6 14.5h4",
  bilingual: "M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c3.2 3 3.2 15 0 18M12 3c-3.2 3-3.2 15 0 18",
  server: "M3.5 4.5h17v6h-17zM3.5 13.5h17v6h-17zM7 7.5h.01M7 16.5h.01",
};

function Icon({ name }: { name: Capability["icon"] }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={PATHS[name]} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
