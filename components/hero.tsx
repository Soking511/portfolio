"use client";

import { useEffect, useState } from "react";
import { useT } from "@/components/lang/provider";
import { useContactIntent } from "@/components/contact-intent";
import { trackAttrs } from "@/lib/analytics";

/**
 * The fold, in the order a stranger needs it: who I am (the name, in both of
 * the scripts I work in), what I do in one sentence, a button per audience,
 * and the facts a recruiter scans for, availability first.
 *
 * The name is the page's one bold gesture. Each script starts from its own
 * edge, Latin from the left and Arabic from the right, on the English and
 * the Arabic page alike; the page's own script is heavy and the other light.
 * The light one settles in once on load (CSS only, skipped under reduced
 * motion); nothing else here moves, so first paint never waits on React.
 *
 * The work follows directly below, so there is no preview row here.
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

        {/* Each line is placed by its language (see .hero-name in
            globals.css), so both carry lang explicitly. */}
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

        <div className="hero-body">
          <div className="hero-pitch">
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
            {H.facts.map(([label, value]) => (
              <div key={label}>
                <dt className="label">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
