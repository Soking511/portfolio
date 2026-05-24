"use client";

import { useEffect, useState } from "react";
import { useT } from "@/components/lang/provider";
import { Latin } from "@/components/lang/latin";

export function Header() {
  const { t, lang, setLang } = useT();
  const isAR = lang === "ar";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Close menu when viewport grows past the mobile breakpoint.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 781px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
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
        background:
          scrolled || open
            ? "color-mix(in oklab, var(--bg) 78%, transparent)"
            : "transparent",
        backdropFilter: scrolled || open ? "blur(14px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled || open ? "blur(14px) saturate(140%)" : "none",
        borderBottom:
          scrolled || open ? "1px solid var(--rule)" : "1px solid transparent",
      }}
    >
      <div
        className="container-edge"
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "center",
          height: 64,
          gap: 16,
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

        <nav className="nav-items">
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
            gap: 10,
            fontSize: 11.5,
          }}
        >
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            aria-label="Switch language"
            className="mono"
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              border: "1px solid var(--rule)",
              fontSize: 11,
              letterSpacing: ".08em",
              color: "var(--fg)",
            }}
          >
            {t.nav.langLabel}
          </button>

          <button
            type="button"
            className="nav-burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              {open ? (
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              ) : (
                <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={"nav-panel" + (open ? " open" : "")}
        onClick={() => setOpen(false)}
      >
        {t.nav.items.map(([label, href], i) => (
          <a
            key={i}
            href={href}
            className="mono"
            style={{
              color: "var(--fg)",
              textTransform: isAR ? "none" : "uppercase",
              letterSpacing: ".08em",
            }}
          >
            <Latin>
              <span style={{ color: "var(--fg-dim)", marginInlineEnd: 10 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </Latin>
            {label}
          </a>
        ))}
      </div>
    </header>
  );
}
