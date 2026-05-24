"use client";

import { useT } from "@/components/lang/provider";
import { Latin } from "@/components/lang/latin";

export function TechStack() {
  const { t, lang } = useT();
  const S = t.stack;
  const isAR = lang === "ar";

  return (
    <section
      id="stack"
      style={{
        padding: "140px 0 100px",
        background: "color-mix(in oklab, var(--fg) 3%, var(--bg))",
        borderTop: "1px solid var(--rule)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div className="container-edge">
        <div
          data-reveal
          style={{ display: "flex", gap: 16, alignItems: "baseline", marginBottom: 48 }}
        >
          <span className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: ".18em" }}>
            ● {S.eyebrow}
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
            {S.sub}
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
            {S.headline_pre}
            <span className="italic" style={{ color: "var(--accent)" }}>
              {S.headline_em}
            </span>
            {S.headline_post}
          </h2>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: "var(--fg-dim)" }}>{S.intro}</p>
        </div>

        <div className="r-grid-4">
          {S.groups.map((g, gi) => (
            <div
              key={gi}
              data-reveal
              style={{
                background: "var(--bg)",
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  className="mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: ".1em",
                    textTransform: isAR ? "none" : "uppercase",
                    color: "var(--fg-dim)",
                  }}
                >
                  <Latin>
                    <span>{String(gi + 1).padStart(2, "0")}</span>
                  </Latin>
                  {" · "}
                  {g.label}
                </span>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 99,
                    background: "var(--accent)",
                  }}
                />
              </div>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                {g.items.map(([name, note], i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      borderBottom: "1px dashed var(--rule)",
                      paddingBottom: 10,
                    }}
                  >
                    <span
                      className="serif latin"
                      style={{ fontSize: 26, lineHeight: 1.1, fontWeight: 500 }}
                    >
                      {name}
                    </span>
                    <span style={{ fontSize: 13, color: "var(--fg-dim)", lineHeight: 1.4 }}>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          data-reveal
          data-reveal-delay="2"
          style={{
            marginTop: 36,
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            alignItems: "center",
          }}
        >
          <span
            className="mono"
            style={{
              fontSize: 11,
              color: "var(--fg-dim)",
              letterSpacing: ".1em",
              textTransform: isAR ? "none" : "uppercase",
              marginInlineEnd: 8,
            }}
          >
            {S.extras_label}:
          </span>
          {S.extras.map((tag) => (
            <span
              key={tag}
              className="mono latin"
              style={{
                fontSize: 11,
                letterSpacing: ".06em",
                padding: "7px 12px",
                border: "1px solid var(--rule)",
                borderRadius: 999,
                color: "var(--fg-dim)",
              }}
            >
              + {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
