"use client";

import { useT } from "@/components/lang/provider";
import { Latin } from "@/components/lang/latin";

export function Experience() {
  const { t, lang } = useT();
  const E = t.cv;
  const isAR = lang === "ar";

  return (
    <section id="cv" style={{ padding: "140px 0 80px" }}>
      <div className="container-edge">
        <div
          data-reveal
          style={{ display: "flex", gap: 16, alignItems: "baseline", marginBottom: 48 }}
        >
          <span className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: ".18em" }}>
            ● {E.eyebrow}
          </span>
          <span
            className="mono"
            style={{
              fontSize: 11,
              color: "var(--fg-dim)",
              letterSpacing: ".14em",
              textTransform: isAR ? "none" : "uppercase",
            }}
          >
            {E.sub}
          </span>
          <span className="rule" style={{ flex: 1 }} />
        </div>

        <div
          className="r-2col-12"
          data-reveal
          data-reveal-delay="1"
          style={{ marginBottom: 60 }}
        >
          <h2
            className="serif"
            style={{
              margin: 0,
              fontSize: isAR ? "clamp(28px, 7.5vw, 96px)" : "clamp(34px, 9vw, 116px)",
              lineHeight: 1,
              fontWeight: 400,
              letterSpacing: "-.02em",
            }}
          >
            {E.headline_pre}
            <span className="italic" style={{ color: "var(--accent)" }}>
              {E.headline_em}
            </span>
            {E.headline_post}
          </h2>
          <a
            href="/youseef-tareq-resume.pdf"
            download
            className="mono"
            style={{
              justifySelf: "start",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 18px",
              border: "1px solid var(--rule)",
              borderRadius: 999,
              fontSize: 11.5,
              letterSpacing: ".08em",
              textTransform: isAR ? "none" : "uppercase",
            }}
          >
            {E.download}
          </a>
        </div>

        <ol style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid var(--rule)" }}>
          {E.rows.map((r, i) => (
            <li
              key={i}
              className="r-cv-row"
              data-reveal
              style={{
                padding: "28px 0",
                borderBottom: "1px solid var(--rule)",
              }}
            >
              <Latin as="div" className="mono">
                <span style={{ fontSize: 12, color: "var(--fg-dim)", letterSpacing: ".04em" }}>
                  {r.years}
                </span>
              </Latin>
              <div>
                <div
                  className="serif"
                  style={{ fontSize: 32, lineHeight: 1.1, fontWeight: 400, letterSpacing: "-.01em" }}
                >
                  {r.role}
                </div>
                <div
                  className="serif italic"
                  style={{ fontSize: 18, marginTop: 6, color: "var(--fg-dim)" }}
                >
                  {r.org} · {r.loc}
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "var(--fg-dim)" }}>{r.blurb}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {r.tags.map((tag) => (
                  <span
                    key={tag}
                    className="mono latin"
                    style={{
                      fontSize: 10.5,
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      padding: "4px 9px",
                      border: "1px solid var(--rule)",
                      borderRadius: 999,
                      color: "var(--fg-dim)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
