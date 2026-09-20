"use client";

import { useT } from "@/components/lang/provider";
import { Latin } from "@/components/lang/latin";

/**
 * The page's one hard mode change: a full-width inverted band between the
 * featured case studies and the rest of the work. On a phone this is what
 * stops the scroll from reading as a single uninterrupted column — a colour
 * inversion does more for rhythm than any amount of motion.
 *
 * Three opinions, each anchored to a project the visitor has just read about,
 * then one compact tool line. Judgement, not a technology inventory.
 */
export function Principles() {
  const { t } = useT();
  const P = t.principles;

  return (
    <section className="band-invert section-y">
      <div className="container-edge">
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
          <span className="eyebrow">{P.eyebrow}</span>
          <span className="rule" style={{ flex: 1 }} />
        </div>

        <h2 className="d2" data-reveal style={{ maxWidth: "16ch" }}>
          {P.headline_pre}
          <span className="em">{P.headline_em}</span>
          {P.headline_post}
        </h2>

        <div className="r-principles" style={{ marginTop: 48 }}>
          {P.items.map((it, i) => (
            <div
              key={it.n}
              data-reveal
              data-reveal-delay={i === 0 ? undefined : String(i)}
              style={{
                paddingBlock: 28,
                borderTop: "1px solid var(--ink-rule)",
              }}
            >
              <Latin as="div" className="mono accent">
                <span style={{ fontSize: 11.5, letterSpacing: "0.14em" }}>{it.n}</span>
              </Latin>
              <p className="statement" style={{ marginTop: 12 }}>
                {it.title}
              </p>
              <p className="body dim" style={{ marginTop: 12, maxWidth: "42ch" }}>
                {it.body}
              </p>
              <p
                className="mono"
                style={{
                  margin: "14px 0 0",
                  fontSize: 11.5,
                  letterSpacing: "0.08em",
                  color: "var(--ink-dim)",
                }}
              >
                ↳ {it.anchor}
              </p>
            </div>
          ))}
        </div>

        <div
          data-reveal
          style={{ marginTop: 48, paddingTop: 26, borderTop: "1px solid var(--ink-rule)" }}
        >
          <div className="eyebrow" style={{ marginBottom: 20 }}>
            {P.tools_label}
          </div>
          <div className="r-tools">
            {P.tools.map(([group, items]) => (
              <div key={group}>
                <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 4 }}>{group}</div>
                <Latin as="div" className="mono">
                  <span style={{ fontSize: 13, color: "var(--ink-dim)", lineHeight: 1.6 }}>
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
