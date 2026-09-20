"use client";

import { useEffect, useState } from "react";
import { useT } from "@/components/lang/provider";
import { useTheme } from "@/components/theme/provider";

export function Header() {
  const { t, lang, setLang } = useT();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 860) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        insetInline: 0,
        zIndex: 50,
        height: 64,
        display: "flex",
        alignItems: "center",
        background: scrolled ? "color-mix(in oklab, var(--bg) 88%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: `1px solid ${scrolled ? "var(--rule)" : "transparent"}`,
        transition: "background .25s ease, border-color .25s ease",
      }}
    >
      <div
        className="container-edge"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <a
          href="#index"
          className="mono latin tap"
          style={{ fontSize: 13, letterSpacing: "0.1em", fontWeight: 500, whiteSpace: "nowrap" }}
        >
          Youseef Tareq
        </a>

        <nav className="nav-items" aria-label={t.nav.menuLabel}>
          {t.nav.items.map(([label, href]) => (
            <a
              key={href}
              href={href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: 40,
                padding: "0 14px",
                fontSize: 14.5,
                borderRadius: 999,
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="mono"
            style={{
              minHeight: 44,
              minWidth: 44,
              padding: "0 12px",
              border: "1px solid var(--rule)",
              borderRadius: 999,
              fontSize: 12,
            }}
          >
            {t.nav.langLabel}
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t.nav.themeLabel}
            style={{
              width: 44,
              height: 44,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--rule)",
              borderRadius: 999,
            }}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            type="button"
            className="nav-burger"
            aria-expanded={open}
            aria-label={t.nav.menuLabel}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="17" height="13" viewBox="0 0 17 13" aria-hidden="true">
              {open ? (
                <path
                  d="M2 2l13 9M15 2L2 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
              ) : (
                <path d="M0 1.5h17M0 11.5h17" stroke="currentColor" strokeWidth="1.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <nav className={`nav-panel${open ? " open" : ""}`} aria-label={t.nav.menuLabel}>
        {t.nav.items.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M14 9.5A6.2 6.2 0 016.5 2 6.5 6.5 0 108 14.5a6.5 6.5 0 006-5z"
        fill="currentColor"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="3.2" fill="currentColor" />
      <path
        d="M8 .8v2M8 13.2v2M.8 8h2M13.2 8h2M2.9 2.9l1.4 1.4M11.7 11.7l1.4 1.4M13.1 2.9l-1.4 1.4M4.3 11.7l-1.4 1.4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
