"use client";

import { useEffect, useState } from "react";
import { useT } from "@/components/lang/provider";
import { Latin } from "@/components/lang/latin";

export function Header() {
  const { t, lang, setLang } = useT();
  const isAR = lang === "ar";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        insetInlineStart: 0,
        insetInlineEnd: 0,
        zIndex: 50,
        transition: "all .35s ease",
        background: scrolled
          ? "color-mix(in oklab, var(--bg) 78%, transparent)"
          : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        borderBottom: scrolled ? "1px solid var(--rule)" : "1px solid transparent",
      }}
    >
      <div
        className="container-edge"
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "center",
          height: 64,
          gap: 24,
        }}
      >
        <a
          href="#index"
          className="mono"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 12,
            letterSpacing: ".06em",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
            <rect x="1" y="1" width="20" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <path
              d="M6 7l5 5 5-5M11 12v4"
              stroke="currentColor"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="square"
            />
          </svg>
          <Latin>
            <span style={{ textTransform: "uppercase" }}>Youseef Tareq</span>
          </Latin>
        </a>

        <nav
          style={{
            display: "flex",
            gap: 4,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {t.nav.items.map(([label, href], i) => (
            <a
              key={i}
              href={href}
              className="mono"
              style={{
                padding: "8px 12px",
                fontSize: 11.5,
                letterSpacing: ".08em",
                textTransform: isAR ? "none" : "uppercase",
                borderRadius: 999,
                transition: "background .2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "color-mix(in oklab, var(--fg) 8%, transparent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <Latin>
                <span style={{ color: "var(--fg-dim)", marginInlineEnd: 6 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Latin>
              {label}
            </a>
          ))}
        </nav>

        <div
          className="mono"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 14,
            fontSize: 11.5,
          }}
        >
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            aria-label="Switch language"
            className="mono"
            style={{
              padding: "5px 10px",
              borderRadius: 999,
              border: "1px solid var(--rule)",
              fontSize: 11,
              letterSpacing: ".08em",
              color: "var(--fg)",
            }}
          >
            {t.nav.langLabel}
          </button>
        </div>
      </div>
    </header>
  );
}
