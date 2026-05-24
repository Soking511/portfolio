"use client";

import { useT } from "@/components/lang/provider";
import { Latin } from "@/components/lang/latin";

export function About() {
  const { t, lang } = useT();
  const A = t.about;
  const isAR = lang === "ar";

  return (
    <section id="about" style={{ padding: "140px 0 80px", position: "relative" }}>
      <div className="container-edge">
        <div
          data-reveal
          style={{ display: "flex", gap: 16, alignItems: "baseline", marginBottom: 48 }}
        >
          <span
            className="mono"
            style={{ fontSize: 11, color: "var(--accent)", letterSpacing: ".18em" }}
          >
            ● {A.eyebrow}
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
            {A.sub}
          </span>
          <span className="rule" style={{ flex: 1 }} />
        </div>

        <div className="r-2col-eq">
          <div data-reveal>
            <h2
              className="serif"
              style={{
                margin: 0,
                fontWeight: 400,
                fontSize: isAR ? "clamp(26px, 6vw, 72px)" : "clamp(30px, 7vw, 84px)",
                lineHeight: 1.05,
                letterSpacing: "-.02em",
              }}
            >
              {A.headline_a}
              <span className="italic" style={{ color: "var(--accent)" }}>
                {A.headline_em}
              </span>
              {A.headline_b}
            </h2>
          </div>

          <div
            data-reveal
            data-reveal-delay="1"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              paddingTop: 14,
            }}
          >
            <p style={{ margin: 0, fontSize: 20, lineHeight: 1.55, color: "var(--fg)" }}>{A.p1}</p>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: "var(--fg-dim)" }}>{A.p2}</p>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: "var(--fg-dim)" }}>{A.p3}</p>
          </div>
        </div>

        <div
          className="r-stats-4"
          data-reveal
          data-reveal-delay="2"
          style={{ marginTop: 96 }}
        >
          {A.stats.map(([n, l], i) => (
            <div
              key={i}
              style={{
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <Latin>
                <span
                  className="serif"
                  style={{
                    fontSize: "clamp(48px, 6vw, 88px)",
                    lineHeight: 0.9,
                    fontWeight: 400,
                  }}
                >
                  {n}
                </span>
              </Latin>
              <span
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: ".1em",
                  textTransform: isAR ? "none" : "uppercase",
                  color: "var(--fg-dim)",
                  marginTop: 8,
                }}
              >
                {l}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
