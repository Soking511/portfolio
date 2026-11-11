"use client";

import { useEffect, useState } from "react";
import { useT } from "@/components/lang/provider";
import { useTheme } from "@/components/theme/provider";
import { contactHref, useContactIntent } from "@/components/contact-intent";
import { homePath } from "@/lib/i18n";
import { trackAttrs } from "@/lib/analytics";

/**
 * From 900px the links sit inline, with the language, the theme and the
 * contact button beside them.
 *
 * Phones get the name, the language and a menu in the bar. The language is
 * out in the open there because a visitor who reads Arabic should not have
 * to open a menu to find it. The contact action moves to a bar at the
 * bottom of the screen, under the thumb: WhatsApp and "Start a project".
 * It appears once the hero's own buttons have scrolled away, and steps
 * aside wherever it would only repeat the page (the contact section) or
 * cover it (the footer, the open menu).
 */
export function Header() {
  const { t, lang, altLang, altHref, homeAnchor, nav } = useT();
  const { theme, toggleTheme } = useTheme();
  const { setIntent } = useContactIntent();
  const [scrolled, setScrolled] = useState(false);
  const [bar, setBar] = useState(false);
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
      // The phone's contact bar: after the hero's buttons, before the contact
      // section, and never over the end of the page.
      const contact = document.getElementById("contact");
      const pastHero = window.scrollY > 440;
      const atContact = contact ? contact.getBoundingClientRect().top < window.innerHeight - 96 : false;
      const atEnd = window.scrollY + window.innerHeight > document.documentElement.scrollHeight - 200;
      setBar(pastHero && !atContact && !atEnd);
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
  const onHome = homeAnchor("#contact") === "#contact";

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
            <span className="nav-phone">
              <LangLink altLang={altLang} href={altHref} label={t.nav.langLabel} />
            </span>
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

      <div className="mobile-bar" data-show={bar && !open} inert={!(bar && !open)}>
        <a
          href={t.contact.whatsapp_href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--secondary"
          {...trackAttrs("whatsapp_click", { from: "mobile_bar" })}
        >
          <WhatsAppIcon />
          {t.nav.whatsapp}
          <span className="visually-hidden"> {t.misc.new_tab}</span>
        </a>
        <a
          href={onHome ? "#contact" : contactHref(homePath(lang), "project")}
          className="btn btn--primary"
          onClick={() => setIntent("project")}
          {...trackAttrs("mobile_bar_project")}
        >
          {t.hero.cta_project}
        </a>
      </div>
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

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M8 1.2a6.8 6.8 0 00-5.86 10.25L1.2 14.8l3.44-.9A6.8 6.8 0 108 1.2zm0 12.3a5.5 5.5 0 01-2.8-.77l-.2-.12-2.04.53.55-1.99-.13-.2A5.5 5.5 0 118 13.5zm3.02-4.12c-.17-.08-.98-.48-1.13-.54-.15-.05-.26-.08-.37.09-.11.16-.43.54-.52.65-.1.1-.2.12-.36.04a4.5 4.5 0 01-2.24-1.96c-.17-.29.17-.27.48-.9.05-.11.03-.2-.01-.29-.04-.08-.37-.9-.51-1.23-.13-.32-.27-.28-.37-.28h-.32a.6.6 0 00-.44.2c-.15.17-.58.57-.58 1.38s.6 1.6.68 1.71c.08.11 1.17 1.79 2.84 2.51 1.05.45 1.46.49 1.99.41.32-.05.98-.4 1.12-.79.14-.39.14-.72.1-.79-.04-.07-.15-.11-.32-.19z"
        fill="currentColor"
      />
    </svg>
  );
}
