"use client";

import { useT } from "@/components/lang/provider";
import { Latin } from "@/components/lang/latin";
import { SectionHead } from "@/components/work-featured";

/**
 * Replaces the old skills grid. Three opinions, each anchored to a project the
 * visitor has just read about, then one compact tool line. The point is
 * judgement, not a technology inventory.
 */
export function Principles() {
  const { t } = useT();
  const P = t.principles;

  return (
    <section className="section-y">
      <div className="container-edge">
        <SectionHead
          eyebrow={P.eyebrow}
          pre={P.headline_pre}
          em={P.headline_em}
          post={P.headline_post}
        />

        <div className="r-principles" style={{ marginTop: 56 }}>
          {P.items.map((it, i) => (
            <div key={it.n} data-reveal data-reveal-delay={i === 0 ? undefined : String(i)}>
              <Latin as="div" className="mono">
                <span style={{ fontSize: 12, color: "var(--accent)", letterSpacing: "0.1em" }}>
                  {it.n}
                </span>
              </Latin>
              <h3
                className="d3"
                style={{ fontSize: "clamp(21px, 2.2vw, 27px)", marginTop: 14 }}
              >
                {it.title}
              </h3>
              <p className="body dim" style={{ marginTop: 12 }}>
                {it.body}
              </p>
              <p
                className="mono"
                style={{
                  margin: "16px 0 0",
                  paddingTop: 12,
                  borderTop: "1px solid var(--rule)",
                  fontSize: 11.5,
                  letterSpacing: "0.06em",
                  color: "var(--fg-dim)",
                }}
              >
                {it.anchor}
              </p>
            </div>
          ))}
        </div>

        <div
          data-reveal
          style={{ marginTop: 72, paddingTop: 28, borderTop: "1px solid var(--rule)" }}
        >
          <div className="eyebrow" style={{ marginBottom: 24 }}>
            {P.tools_label}
          </div>
          <div className="r-tools">
            {P.tools.map(([group, items]) => (
              <div key={group}>
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6 }}>{group}</div>
                <Latin as="div" className="mono">
                  <span style={{ fontSize: 13, color: "var(--fg-dim)", lineHeight: 1.6 }}>
                    {items}
                  </span>
                </Latin>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
