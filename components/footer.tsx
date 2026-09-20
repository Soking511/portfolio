"use client";

import { useT } from "@/components/lang/provider";

// Kept here rather than in strings.ts: these are URLs, not copy, and they are
// identical in both languages.
const ELSEWHERE: Array<[string, string]> = [
  ["GitHub", "https://github.com/Soking511"],
  ["LinkedIn", "https://linkedin.com/in/youseef-tareq"],
  ["Facebook", "https://www.facebook.com/SokingElectron"],
  ["WhatsApp", "https://wa.me/201557337989"],
];

export function Footer() {
  const { t } = useT();
  const F = t.footer;

  return (
    <footer
      className="section-y"
      style={{ borderTop: "1px solid var(--rule)", paddingBottom: 32 }}
    >
      <div className="container-edge">
        <div className="r-footer-cols">
          <div>
            <div className="mono latin" style={{ fontSize: 13, letterSpacing: "0.1em", fontWeight: 500 }}>
              Youseef Tareq
            </div>
            <p className="dim" style={{ margin: "8px 0 0", fontSize: 14 }}>
              {F.identity_tagline}
            </p>
            <p className="dim" style={{ margin: "18px 0 0", fontSize: 13, lineHeight: 1.6, maxWidth: "40ch" }}>
              {F.colophon_text}
            </p>
          </div>

          <nav aria-label={F.index_label}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              {F.index_label}
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 8 }}>
              {t.nav.items.map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="tap" style={{ fontSize: 14 }}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              {F.elsewhere_label}
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 8 }}>
              {ELSEWHERE.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="latin tap"
                    style={{ fontSize: 14 }}
                  >
                    {label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              {F.direct_label}
            </div>
            <a
              href="mailto:youseeftareq5176@gmail.com"
              className="latin tap"
              style={{ fontSize: 14, wordBreak: "break-all" }}
            >
              youseeftareq5176@gmail.com
            </a>
          </div>
        </div>

        <div
          style={{
            marginTop: 56,
            paddingTop: 20,
            borderTop: "1px solid var(--rule)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <span className="mono" style={{ fontSize: 11.5, color: "var(--fg-dim)", letterSpacing: "0.04em" }}>
            {F.copyright}
          </span>
          <a
            href="#index"
            className="mono tap"
            style={{ fontSize: 11.5, color: "var(--fg-dim)", letterSpacing: "0.04em" }}
          >
            {F.to_top} ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
