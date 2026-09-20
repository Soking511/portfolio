"use client";

import { useT } from "@/components/lang/provider";
import { Latin } from "@/components/lang/latin";

export function Experience() {
  const { t } = useT();
  const E = t.cv;

  return (
    <section id="cv" className="section-y">
      <div className="container-edge">
        <header
          data-reveal
          style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}
        >
          <span className="eyebrow">{E.eyebrow}</span>
          <span className="rule" style={{ flex: 1 }} />
        </header>

        <div
          data-reveal
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 20,
            marginBottom: 44,
          }}
        >
          <h2 className="d2">
            {E.headline_pre}
            <span className="em">{E.headline_em}</span>
            {E.headline_post}
          </h2>
          <a href="/youseef-tareq-resume.pdf" download className="btn btn-ghost">
            {E.download}
          </a>
        </div>

        <ol
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            borderTop: "1px solid var(--rule)",
          }}
        >
          {E.rows.map((r) => (
            <li
              key={`${r.years}-${r.role}`}
              data-reveal
              className="r-cv-row"
              style={{ paddingBlock: 26, borderBottom: "1px solid var(--rule)" }}
            >
              <Latin as="div" className="mono">
                <span style={{ fontSize: 12, color: "var(--fg-dim)", letterSpacing: "0.06em" }}>
                  {r.years}
                </span>
              </Latin>

              <div>
                <h3 className="d3" style={{ fontSize: "clamp(19px, 2vw, 24px)" }}>
                  {r.role}
                </h3>
                <p className="dim" style={{ margin: "5px 0 0", fontSize: 14.5 }}>
                  {r.org} · {r.loc}
                </p>
              </div>

              <div>
                <p className="body dim" style={{ maxWidth: "62ch" }}>
                  {r.blurb}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
                  {r.tags.map((tag) => (
                    <span key={tag} className="chip latin">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
