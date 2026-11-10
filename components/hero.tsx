"use client";

import { useEffect, useState } from "react";
import { useT } from "@/components/lang/provider";
import { useContactIntent } from "@/components/contact-intent";
import { trackAttrs } from "@/lib/analytics";

const FACT_TINTS = ["mint", "lilac", "amber", "sky"] as const;

/**
 * The fold, in the order a stranger needs it: who I am (the name, with its
 * other script under it), what I do in one sentence, and a button per
 * audience. Beside it, the four facts a recruiter scans for, availability
 * first, each on its own tint, so the first screen has colour and nothing
 * in it is empty.
 *
 * The second script settles in once on load (CSS only, skipped under reduced
 * motion); nothing else here moves, so first paint never waits on React.
 */
export function Hero() {
  const { t, lang, altLang, altHref } = useT();
  const { setIntent } = useContactIntent();
  const H = t.hero;

  // After mount only (navigator is client-side); positioned out of flow in
  // globals.css, so appearing late never shifts the fold.
  const [suggestAlt, setSuggestAlt] = useState(false);
  useEffect(() => {
    const preferred = (navigator.languages?.[0] ?? navigator.language ?? "").toLowerCase();
    setSuggestAlt(preferred.startsWith(altLang));
  }, [altLang]);

  return (
    <section id="top" className="hero" aria-labelledby="hero-name">
      <div className="container">
        {suggestAlt && (
          <p className="hero-alt">
            <a
              href={altHref}
              hrefLang={altLang}
              lang={altLang}
              dir={altLang === "ar" ? "rtl" : "ltr"}
              {...trackAttrs("lang_suggest", { to: altLang })}
            >
              {H.alt_suggest}
            </a>
          </p>
        )}

        <div className="hero-grid">
          <div>
            <h1 className="hero-name" id="hero-name">
              <span className="hero-name__line hero-name__line--primary" lang={lang}>
                {H.name}
              </span>
              <span
                className="hero-name__line hero-name__line--alt"
                lang={altLang}
                dir={altLang === "ar" ? "rtl" : "ltr"}
                translate="no"
              >
                {H.name_alt}
              </span>
            </h1>

            <p className="hero-statement">{H.statement}</p>
            <div className="actions">
              <a
                href="#contact"
                className="btn btn--primary"
                onClick={() => setIntent("project")}
                {...trackAttrs("hero_start_project")}
              >
                {H.cta_project}
              </a>
              <a href="#cv" className="btn btn--secondary" {...trackAttrs("hero_hiring")}>
                {H.cta_hiring}
              </a>
            </div>
          </div>

          <dl className="facts">
            {H.facts.map(([label, value], i) => (
              <div key={label} className={`fact tint-${FACT_TINTS[i % FACT_TINTS.length]}`}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
