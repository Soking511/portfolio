"use client";

import { useEffect, useState } from "react";
import { useT } from "@/components/lang/provider";
import { Latin } from "@/components/lang/latin";

export function Footer() {
  const { t, lang } = useT();
  const F = t.footer;
  const isAR = lang === "ar";

  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(
      new Date().toLocaleDateString(isAR ? "ar-EG" : "en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    );
  }, [isAR]);

  return (
    <footer
      style={{
        borderTop: "1px solid var(--rule)",
        padding: "80px 0 32px",
        background: "color-mix(in oklab, var(--fg) 3%, var(--bg))",
      }}
    >
      <div className="container-edge">
        <div
          className="r-2col-1408"
          data-reveal
          style={{ marginBottom: 64 }}
        >
          <div
            style={{
              border: "1px solid var(--rule)",
              borderRadius: 18,
              padding: "40px 44px",
              background: "var(--card)",
              display: "flex",
              flexDirection: "column",
              gap: 24,
              justifyContent: "space-between",
            }}
          >
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: ".16em",
                color: "var(--fg-dim)",
                textTransform: isAR ? "none" : "uppercase",
              }}
            >
              {F.closing_label}
            </div>
            <h2
              className="serif"
              style={{
                margin: 0,
                fontSize: isAR ? "clamp(24px, 5.5vw, 58px)" : "clamp(26px, 6vw, 64px)",
                lineHeight: 1.1,
                letterSpacing: "-.02em",
                fontWeight: 400,
                maxWidth: "26ch",
              }}
            >
              {F.closing_a}
              <span className="italic" style={{ color: "var(--accent)" }}>
                {F.closing_em}
              </span>
              {F.closing_b}
            </h2>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
              <a
                href="mailto:youseeftareq5176@gmail.com"
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
                {F.closing_cta}
                <svg className="arrow-x" width="14" height="14" viewBox="0 0 14 14">
                  <path
                    d="M2 7h10M8 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    fill="none"
                    strokeLinecap="square"
                  />
                </svg>
              </a>
              <span className="mono" style={{ fontSize: 11.5, color: "var(--fg-dim)", letterSpacing: ".06em" }}>
                {F.closing_or}
              </span>
            </div>
          </div>

          <div
            style={{
              border: "1px solid var(--rule)",
              borderRadius: 18,
              padding: "28px 30px",
              display: "flex",
              flexDirection: "column",
              gap: 22,
              position: "relative",
              overflow: "hidden",
              background: "var(--bg)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" style={{ color: "var(--accent)" }}>
                    <rect x="1" y="1" width="20" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    <path
                      d="M6 7l5 5 5-5M11 12v4"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      fill="none"
                      strokeLinecap="square"
                    />
                  </svg>
                  <span
                    className={`mono ${isAR ? "" : "latin"}`}
                    style={{
                      fontSize: 11.5,
                      letterSpacing: ".16em",
                      textTransform: isAR ? "none" : "uppercase",
                      color: "var(--fg-dim)",
                    }}
                  >
                    {F.identity_label}
                  </span>
                </div>
                <div
                  className="serif"
                  style={{
                    fontSize: "clamp(28px, 3vw, 40px)",
                    lineHeight: 1.1,
                    fontWeight: 500,
                    letterSpacing: "-.02em",
                  }}
                >
                  {F.identity_name}
                </div>
                <div
                  className="serif italic"
                  style={{ fontSize: 16, color: "var(--fg-dim)", lineHeight: 1.4, maxWidth: "24ch" }}
                >
                  {F.identity_tagline}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 6,
                  padding: "8px 12px",
                  borderRadius: 10,
                  background: "color-mix(in oklab, #00E08A 18%, transparent)",
                  border: "1px solid color-mix(in oklab, #00E08A 35%, transparent)",
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: 99,
                      background: "#00E08A",
                      boxShadow: "0 0 8px #00E08A",
                    }}
                  />
                  <span
                    className="mono"
                    style={{
                      fontSize: 10.5,
                      letterSpacing: ".1em",
                      textTransform: isAR ? "none" : "uppercase",
                      color: "var(--fg)",
                      fontWeight: 500,
                    }}
                  >
                    {F.availability_label}
                  </span>
                </span>
                <Latin>
                  <span
                    className="mono"
                    style={{ fontSize: 10, letterSpacing: ".08em", color: "var(--fg-dim)" }}
                  >
                    {F.availability_window}
                  </span>
                </Latin>
              </div>
            </div>

            <div style={{ height: 1, background: "var(--rule)" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {F.monogram_rows.map(([k, v], i) => {
                const vLatin = /^[\x00-\x7F+\-.,/@:·\s]+$/.test(v);
                return (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "92px 1fr", gap: 12 }}>
                    <span
                      className="mono"
                      style={{
                        fontSize: 10.5,
                        letterSpacing: ".08em",
                        textTransform: isAR ? "none" : "uppercase",
                        color: "var(--fg-dim)",
                      }}
                    >
                      {k}
                    </span>
                    <span className={vLatin ? "latin" : ""} style={{ fontSize: 13.5, lineHeight: 1.5 }}>
                      {v}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="r-footer-cols">
          <div>
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: ".14em",
                color: "var(--fg-dim)",
                textTransform: isAR ? "none" : "uppercase",
              }}
            >
              {F.colophon_label}
            </div>
            <p
              style={{
                margin: "10px 0 0",
                fontSize: 13.5,
                lineHeight: 1.6,
                color: "var(--fg-dim)",
                maxWidth: "44ch",
              }}
            >
              {F.colophon_text}
            </p>
          </div>
          <div>
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: ".14em",
                color: "var(--fg-dim)",
                textTransform: isAR ? "none" : "uppercase",
                marginBottom: 14,
              }}
            >
              {F.index_label}
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {t.nav.items.map(([l, h], i) => (
                <li key={i}>
                  <a href={h} style={{ fontSize: 15, color: "var(--fg)" }}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: ".14em",
                color: "var(--fg-dim)",
                textTransform: isAR ? "none" : "uppercase",
                marginBottom: 14,
              }}
            >
              {F.elsewhere_label}
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                ["GitHub", "https://soking.tech"],
                ["LinkedIn", "https://linkedin.com/in/youseef-tareq"],
                ["Facebook", "https://www.facebook.com/SokingElectron"],
                ["WhatsApp", "https://wa.me/201557337989"],
              ].map(([label, href], i) => (
                <li key={i}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener"
                    className="latin"
                    style={{
                      fontSize: 15,
                      color: "var(--fg)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {label} <span style={{ color: "var(--fg-dim)" }}>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: ".14em",
                color: "var(--fg-dim)",
                textTransform: isAR ? "none" : "uppercase",
                marginBottom: 14,
              }}
            >
              {F.direct_label}
            </div>
            <a
              href="mailto:youseeftareq5176@gmail.com"
              className="latin"
              style={{
                fontSize: 15,
                color: "var(--fg)",
                borderBottom: "1px solid var(--rule)",
                paddingBottom: 2,
              }}
            >
              youseeftareq5176@gmail.com
            </a>
            <p style={{ margin: "10px 0 0", fontSize: 12.5, color: "var(--fg-dim)" }}>{F.direct_note}</p>
          </div>
        </div>

        <div
          style={{
            marginTop: 36,
            paddingTop: 18,
            borderTop: "1px solid var(--rule)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span className="mono" style={{ fontSize: 11, color: "var(--fg-dim)", letterSpacing: ".06em" }}>
            {F.copyright}
          </span>
          <Latin>
            <span className="mono" style={{ fontSize: 11, color: "var(--fg-dim)", letterSpacing: ".06em" }}>
              {F.last_shipped} {today}
            </span>
          </Latin>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mono"
            style={{
              padding: "8px 14px",
              border: "1px solid var(--rule)",
              borderRadius: 999,
              fontSize: 11,
              letterSpacing: ".08em",
              textTransform: isAR ? "none" : "uppercase",
            }}
          >
            {F.to_top}
          </button>
        </div>
      </div>
    </footer>
  );
}
