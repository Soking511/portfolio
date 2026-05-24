"use client";

import { useT } from "@/components/lang/provider";
import { Latin } from "@/components/lang/latin";

const TICKER_WORDS = [
  "Angular",
  "·",
  "Node.js",
  "·",
  "TypeScript",
  "·",
  "MongoDB",
  "·",
  "Express",
  "·",
  "Tailwind",
  "·",
  "Docker",
  "·",
  "Cloudflare",
  "·",
  "Linux / VPS",
  "·",
  "Socket.IO",
  "·",
  "PostgreSQL",
  "·",
  "Django",
  "·",
  "Lemon Squeezy",
  "·",
  "Framer Motion",
  "·",
];

export function Hero() {
  const { t, lang } = useT();
  const H = t.hero;
  const isAR = lang === "ar";
  const tickerDoubled = [...TICKER_WORDS, ...TICKER_WORDS];

  return (
    <section
      id="index"
      style={{
        position: "relative",
        minHeight: "100vh",
        paddingTop: 120,
        paddingBottom: 60,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* credentials bar */}
      <div
        className="container-edge"
        data-reveal
        style={{ paddingTop: 8, paddingBottom: 32, borderBottom: "1px solid var(--rule)" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "160px 1fr",
            gap: 28,
            alignItems: "center",
          }}
        >
          <span
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: ".14em",
              color: "var(--fg-dim)",
              textTransform: isAR ? "none" : "uppercase",
            }}
          >
            {H.employment_label}
          </span>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              columnGap: 22,
              rowGap: 8,
            }}
          >
            {H.employment.map((c, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 22 }}>
                {i > 0 && (
                  <span aria-hidden="true" style={{ opacity: 0.4, fontSize: 14, color: "var(--fg-dim)" }}>
                    ·
                  </span>
                )}
                <span
                  className={isLatinBrand(c) ? "serif latin" : "serif"}
                  style={{ fontSize: "clamp(17px, 1.5vw, 22px)", color: "var(--fg)" }}
                >
                  {c}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        className="container-edge"
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 40,
          paddingTop: 64,
          paddingBottom: 40,
        }}
      >
        <div
          data-reveal
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 18 }}
        >
          <span
            className="mono"
            style={{ fontSize: 11, color: "var(--accent)", letterSpacing: ".18em" }}
          >
            ● {H.eyebrow}
          </span>
          <span style={{ width: 1, height: 14, background: "var(--rule)" }} />
          <span
            className="mono"
            style={{
              fontSize: 11,
              color: "var(--fg-dim)",
              letterSpacing: ".14em",
              textTransform: isAR ? "none" : "uppercase",
            }}
          >
            {H.since}
          </span>
          <span style={{ width: 1, height: 14, background: "var(--rule)" }} />
          <span
            className="mono"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
              color: "var(--fg-dim)",
              letterSpacing: ".14em",
              textTransform: isAR ? "none" : "uppercase",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: 99,
                background: "#00E08A",
                boxShadow: "0 0 8px #00E08A",
              }}
            />
            {H.available}
          </span>
        </div>

        <h1
          className="serif"
          data-reveal
          data-reveal-delay="1"
          style={{
            margin: 0,
            fontWeight: 400,
            fontSize: isAR ? "clamp(56px, 9.5vw, 144px)" : "clamp(64px, 11vw, 168px)",
            lineHeight: 0.96,
            letterSpacing: isAR ? "-0.015em" : "-0.025em",
            maxWidth: "14ch",
          }}
        >
          {H.headline_pre}
          <span className="italic" style={{ color: "var(--accent)" }}>
            {H.headline_em}
          </span>
          {H.headline_post}
        </h1>

        <div
          data-reveal
          data-reveal-delay="2"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 48,
            paddingTop: 24,
            borderTop: "1px solid var(--rule)",
          }}
        >
          <div>
            <div className="tag" style={{ marginBottom: 14 }}>
              {H.sub_label}
            </div>
            <p style={{ margin: 0, fontSize: "clamp(20px, 2vw, 26px)", lineHeight: 1.55, maxWidth: "52ch" }}>
              <span className="serif italic" style={{ color: "var(--accent)" }}>
                {H.name}.
              </span>{" "}
              {H.sub_text_a}
            </p>
            <p style={{ margin: "18px 0 0", fontSize: 16, lineHeight: 1.65, color: "var(--fg-dim)", maxWidth: "52ch" }}>
              {H.sub_text_b}
            </p>
          </div>

          <aside
            style={{
              border: "1px solid var(--rule)",
              borderRadius: 14,
              padding: "20px 22px",
              background: "var(--card)",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              alignSelf: "start",
            }}
          >
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: ".14em",
                textTransform: isAR ? "none" : "uppercase",
                color: "var(--fg-dim)",
              }}
            >
              {H.glance_title}
            </div>
            {H.glance_rows.map(([k, v], i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "110px 1fr",
                  gap: 16,
                  paddingBottom: 10,
                  borderBottom: "1px dashed var(--rule)",
                }}
              >
                <span
                  className="mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: ".06em",
                    color: "var(--fg-dim)",
                    textTransform: isAR ? "none" : "uppercase",
                  }}
                >
                  {k}
                </span>
                <span style={{ fontSize: 13.5, lineHeight: 1.45 }}>{v}</span>
              </div>
            ))}
          </aside>
        </div>

        <div
          data-reveal
          data-reveal-delay="3"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <a
            href="#works"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 22px",
              borderRadius: 999,
              background: "var(--accent)",
              color: "var(--accent-ink)",
              fontWeight: 600,
              letterSpacing: ".02em",
            }}
          >
            {H.cta_works}
            <svg className="arrow-x" width="14" height="14" viewBox="0 0 14 14">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="square" />
            </svg>
          </a>
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 22px",
              borderRadius: 999,
              border: "1px solid var(--rule)",
              color: "var(--fg)",
            }}
          >
            {H.cta_contact}
          </a>
          <a
            href="/youseef-tareq-resume.pdf"
            download
            className="mono"
            style={{
              marginInlineStart: "auto",
              fontSize: 11.5,
              letterSpacing: ".1em",
              textTransform: isAR ? "none" : "uppercase",
              color: "var(--fg-dim)",
              borderBottom: "1px solid var(--rule)",
              paddingBottom: 4,
            }}
          >
            {H.resume}
          </a>
        </div>
      </div>

      {/* ticker */}
      <div
        style={{
          paddingTop: 14,
          paddingBottom: 14,
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
          overflow: "hidden",
          whiteSpace: "nowrap",
          direction: "ltr",
        }}
      >
        <div style={{ display: "inline-block", animation: "marq 70s linear infinite" }}>
          {tickerDoubled.map((w, i) => (
            <span
              key={i}
              className="mono latin"
              style={{
                fontSize: w === "·" ? 18 : 16,
                padding: "0 18px",
                color: w === "·" ? "var(--fg-dim)" : "var(--fg)",
                letterSpacing: ".14em",
                textTransform: "uppercase",
                verticalAlign: "middle",
              }}
            >
              {w}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function isLatinBrand(s: string) {
  return /^[\x00-\x7F+\-.,/@\s]+$/.test(s);
}
