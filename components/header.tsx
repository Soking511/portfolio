"use client";

import { useEffect, useState } from "react";
import { useT } from "@/components/lang/provider";
import { useTheme } from "@/components/theme/provider";
import { trackAttrs } from "@/lib/analytics";

/**
 * Phones get the name, the contact button and a menu — language and theme
 * move inside the panel, because three small controls next to the name read
 * as clutter at 375px. From 900px the links sit inline.
 *
 * The contact button never hides: on a long page the form is otherwise a
 * long way from wherever the visitor decides.
 */
export function Header() {
  const { t, altLang, altHref, homeAnchor, nav } = useT();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Read from the page as it scrolls: whether to show the header's edge, and
  // which section is in view (the menu marks it; home page only).
  useEffect(() => {
    const ids = ["work", "skills", "about", "cv", "contact"];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
      // The section crossing a line just above the middle of the screen is
      // the one being read. Measured, not inferred from observer events, so
      // a jump (an anchor link, the End key) lands on the right answer.
      const line = window.innerHeight * 0.45;
      const current = sections.find((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= line && r.bottom > line;
      });
      setActive(current?.id ?? null);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 900) setOpen(false);
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

  const close = () => setOpen(false);

  return (
    <>
      <header className="site-header" data-scrolled={scrolled || open}>
        <div className="container site-header__row">
          <a href={homeAnchor("#top")} className="wordmark" onClick={close}>
            {t.hero.name}
          </a>

          <nav className="nav-items" aria-label={t.nav.menuLabel}>
            {nav.map(([label, href]) => (
              <a key={href} href={href} aria-current={href === `#${active}` ? "true" : undefined}>
                {label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <span className="nav-desktop">
              <LangLink altLang={altLang} href={altHref} label={t.nav.langLabel} />
              <ThemeButton theme={theme} toggle={toggleTheme} label={t.nav.themeLabel} />
            </span>
            <a
              href={homeAnchor("#contact")}
              className="btn btn--primary nav-cta"
              onClick={close}
              {...trackAttrs("header_cta")}
            >
              {t.nav.cta}
            </a>
            <button
              type="button"
              className="icon-btn nav-burger"
              aria-expanded={open}
              aria-controls="nav-panel"
              onClick={() => setOpen((v) => !v)}
            >
              {/* Visible on most phones; on the narrowest the word is hidden
                  visually but stays the button's name. */}
              <span className="nav-burger-label">{open ? t.nav.closeLabel : t.nav.menuLabel}</span>
              <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true">
                {open ? (
                  <path d="M2 1l12 10M14 1L2 11" stroke="currentColor" strokeWidth="1.6" fill="none" />
                ) : (
                  <path d="M0 2h16M0 10h16" stroke="currentColor" strokeWidth="1.6" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* A sibling, not a child: backdrop-filter on the header would make it
          the containing block for this fixed panel. */}
      <nav id="nav-panel" className={`nav-panel${open ? " open" : ""}`} aria-label={t.nav.menuLabel}>
        {[...nav, [t.nav.contact, homeAnchor("#contact")]].map(([label, href]) => (
          <a key={href} href={href} className="nav-panel__link" onClick={close}>
            {label}
          </a>
        ))}
        <div className="nav-panel__tools">
          <LangLink altLang={altLang} href={altHref} label={t.nav.langLabel} />
          <ThemeButton theme={theme} toggle={toggleTheme} label={t.nav.themeLabel} withText />
        </div>
      </nav>
    </>
  );
}

/** A link to this same page in the other language — each is its own URL. */
function LangLink({ altLang, href, label }: { altLang: "en" | "ar"; href: string; label: string }) {
  return (
    <a
      href={href}
      hrefLang={altLang}
      lang={altLang}
      className="icon-btn"
      {...trackAttrs("lang_switch", { to: altLang })}
    >
      {label}
    </a>
  );
}

function ThemeButton({
  theme,
  toggle,
  label,
  withText = false,
}: {
  theme: "light" | "dark";
  toggle: () => void;
  label: string;
  withText?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={toggle}
      className="icon-btn"
      aria-label={withText ? undefined : label}
      aria-pressed={theme === "dark"}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      {withText && <span>{label}</span>}
    </button>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M14 9.5A6.2 6.2 0 016.5 2 6.5 6.5 0 108 14.5a6.5 6.5 0 006-5z" fill="currentColor" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
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
