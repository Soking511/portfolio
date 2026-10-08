"use client";

import { useEffect, useState } from "react";
import { useT } from "@/components/lang/provider";
import { Latin } from "@/components/lang/latin";
import { useContactIntent } from "@/components/contact-intent";
import { Arrow } from "@/components/arrow";
import { trackAttrs } from "@/lib/analytics";

/**
 * The fold. In order of what a stranger needs: availability, what I build,
 * who I am, one action per audience (a client, a recruiter), then proof —
 * the names of real shipped work — and what I build it with. The résumé is
 * reached through "Hiring?", not a third link of its own; phones drop the
 * stack line, which "What I reach for" repeats further down.
 *
 * The name is deliberately absent — the header wordmark already carries it,
 * and repeating it burned the most valuable line on the page.
 *
 * Kept short of a full screen so the next section's heading shows at the
 * bottom edge: a fold that fills the viewport exactly reads as the whole page.
 *
 * Nothing here carries data-reveal: first paint must not wait for hydration.
 */
export function Hero() {
  const { t, altLang, altHref } = useT();
  const { setIntent } = useContactIntent();
  const H = t.hero;

  // Only after mount (navigator is client-only), and absolutely positioned in
  // the gap under the header, so appearing late never shifts the fold.
  const [suggestAlt, setSuggestAlt] = useState(false);
  useEffect(() => {
    const preferred = (navigator.languages?.[0] ?? navigator.language ?? "").toLowerCase();
    setSuggestAlt(preferred.startsWith(altLang));
  }, [altLang]);

  return (
    <section
      id="index"
      style={{
        position: "relative",
        minHeight: "min(84svh, 780px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: 92,
        paddingBottom: 28,
      }}
    >
      {suggestAlt && (
        <div className="container-edge hero-alt">
          <a
            href={altHref}
            hrefLang={altLang}
            lang={altLang}
            dir={altLang === "ar" ? "rtl" : "ltr"}
            {...trackAttrs("lang_suggest", { to: altLang })}
          >
            {H.alt_suggest}
          </a>
        </div>
      )}

      <div className="container-edge" style={{ width: "100%" }}>
        <p
          className="mono"
          style={{
            margin: "0 0 22px",
            display: "inline-flex",
            alignItems: "center",
            gap: 9,
            fontSize: 11.5,
            letterSpacing: "0.14em",
            color: "var(--accent)",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 7,
              height: 7,
              borderRadius: 99,
              background: "var(--accent)",
              flex: "none",
            }}
          />
          {H.status_line}
        </p>

        <h1 className="d1" style={{ maxWidth: "15ch" }}>
          {H.headline_pre}
          <span className="em">{H.headline_em}</span>
          {H.headline_post}
        </h1>

        <p className="lead dim" style={{ maxWidth: "40ch", marginTop: 22 }}>
          {H.sub}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <a
            href="#contact"
            className="btn btn-primary"
            onClick={() => setIntent("project")}
            {...trackAttrs("hero_start_project")}
          >
            {H.cta_project}
            <Arrow />
          </a>
          <a href="#cv" className="btn btn-ghost" {...trackAttrs("hero_hiring")}>
            {H.cta_hiring}
          </a>
        </div>

        <div style={{ marginTop: 40, paddingTop: 18, borderTop: "1px solid var(--rule)" }}>
          <p className="hero-recent">
            <span className="eyebrow">{H.recent_label}</span>
            {H.recent.map(([label, anchor]) => (
              <a
                key={anchor}
                href={`#${anchor}`}
                className="tap"
                {...trackAttrs("hero_recent", { project: anchor })}
              >
                {label}
              </a>
            ))}
          </p>

          <Latin as="div" className="mono hero-stack">
            <span style={{ fontSize: 12, letterSpacing: "0.08em", color: "var(--fg-dim)" }}>
              {H.stack_line}
            </span>
          </Latin>
        </div>
      </div>
    </section>
  );
}
