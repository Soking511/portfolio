"use client";

import { useEffect, useState } from "react";
import { useT } from "@/components/lang/provider";
import { useTheme } from "@/components/theme/provider";

/**
 * Phones get a wordmark and a single labelled menu button — the language and
 * theme controls move inside the panel, because three competing circular
 * buttons next to the name read as clutter at 375px. Above 860px the four
 * links sit inline and the panel is never used.
 */
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

  const chromeOn = scrolled || open;

  return (
    <>
      <header
        style={{
          position: "fixed",
        top: 0,
        insetInline: 0,
        zIndex: 50,
        height: 60,
        display: "flex",
        alignItems: "center",
        background: chromeOn ? "color-mix(in oklab, var(--bg) 90%, transparent)" : "transparent",
        backdropFilter: chromeOn ? "blur(12px)" : "none",
        WebkitBackdropFilter: chromeOn ? "blur(12px)" : "none",
        borderBottom: `1px solid ${chromeOn ? "var(--rule)" : "transparent"}`,
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
          onClick={() => setOpen(false)}
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
          <span style={{ width: 8 }} />
          <LangButton lang={lang} setLang={setLang} label={t.nav.langLabel} />
          <ThemeButton theme={theme} toggle={toggleTheme} label={t.nav.themeLabel} />
        </nav>

        <button
          type="button"
          className="nav-burger"
          aria-expanded={open}
          aria-controls="nav-panel"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? t.nav.closeLabel : t.nav.menuLabel}
          <svg width="15" height="11" viewBox="0 0 15 11" aria-hidden="true">
            {open ? (
              <path
                d="M1.5 1.5l12 8M13.5 1.5l-12 8"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
              />
            ) : (
              <path d="M0 1.2h15M0 9.8h15" stroke="currentColor" strokeWidth="1.4" />
            )}
          </svg>
        </button>
      </div>

      </header>

      {/* Sibling, not a child: backdrop-filter on <header> makes it the
          containing block for position:fixed descendants, which would resolve
          the panel's top/bottom against a 60px box instead of the viewport. */}
      <nav id="nav-panel" className={`nav-panel${open ? " open" : ""}`} aria-label={t.nav.menuLabel}>
        {t.nav.items.map(([label, href], i) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            <span className="n latin">{String(i + 1).padStart(2, "0")}</span>
            {label}
          </a>
        ))}

        <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
          <LangButton lang={lang} setLang={setLang} label={t.nav.langLabel} wide />
          <ThemeButton theme={theme} toggle={toggleTheme} label={t.nav.themeLabel} wide />
        </div>
      </nav>
    </>
  );
}

function LangButton({
  lang,
  setLang,
  label,
  wide = false,
}: {
  lang: "en" | "ar";
  setLang: (l: "en" | "ar") => void;
  label: string;
  wide?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => setLang(lang === "en" ? "ar" : "en")}
      className="mono"
      style={{
        minHeight: 44,
        padding: wide ? "0 22px" : "0 14px",
        border: "1px solid var(--rule)",
        borderRadius: 999,
        fontSize: 12.5,
      }}
    >
      {label}
    </button>
  );
}

function ThemeButton({
  theme,
  toggle,
  label,
  wide = false,
}: {
  theme: "light" | "dark";
  toggle: () => void;
  label: string;
  wide?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      style={{
        minHeight: 44,
        minWidth: 44,
        padding: wide ? "0 22px" : 0,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid var(--rule)",
        borderRadius: 999,
      }}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M14 9.5A6.2 6.2 0 016.5 2 6.5 6.5 0 108 14.5a6.5 6.5 0 006-5z" fill="currentColor" />
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
