"use client";

import { useEffect, useState } from "react";
import { useT } from "@/components/lang/provider";
import { useContactIntent } from "@/components/contact-intent";
import { trackAttrs } from "@/lib/analytics";
import { FEATURED } from "@/lib/projects";

/**
 * The fold, in the order a stranger needs it: who I am (the name, in both of
 * the scripts I work in), what I do in one sentence, a button per audience,
 * and the facts a recruiter scans for, availability first. Availability is
 * a fact like the others, not a badge.
 *
 * The name in two scripts is the page's one bold gesture: this page's script
 * heavy, the other light beneath it, one typeface drawing both. Its second
 * line settles in once on load (CSS only, skipped under reduced motion);
 * nothing else here moves, so first paint never waits on React.
 *
 * Under it, a row of three real projects, so the first screen shows work and
 * not only claims; each opens that project further down the page. On phones
 * the facts move below that row (CSS order only; they hold nothing
 * focusable), or the row would start a full screen down.
 */
export function Hero() {
  const { t, lang, altLang, altHref } = useT();
  const { setIntent } = useContactIntent();
  const H = t.hero;
  const W = t.works;
  const recent = ["menuvista", "damanhour-university", "eg-pricey"].map((slug) => {
    const i = FEATURED.findIndex((m) => m.slug === slug);
    return { slug, title: W.featured[i].title, sub: W.featured[i].kicker, image: FEATURED[i].image! };
  });

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

        {/* The name in two scripts. avoid-ai-design-ignore: SD5 */}
        <h1 className="hero-name" id="hero-name">
          <span className="hero-name__line hero-name__line--primary">{H.name}</span>
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
            <div className="hero-actions">
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

          <dl className="facts" lang={lang}>
            {H.facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <nav className="hero-work" aria-label={H.peek_label}>
          <h2 className="label">{H.peek_label}</h2>
          <ul>
            {recent.map((p, i) => (
              <li key={p.slug}>
                <a href={`#${p.slug}`} {...trackAttrs("hero_recent", { project: p.slug })}>
                  <span className="hero-work__shot">
                    <img
                      src={`/work/${p.image}-720.webp`}
                      srcSet={`/work/${p.image}-720.webp 720w, /work/${p.image}-1440.webp 1440w`}
                      sizes="(max-width: 720px) 80vw, 380px"
                      width={720}
                      height={450}
                      alt=""
                      decoding="async"
                      loading={i === 0 ? "eager" : "lazy"}
                      fetchPriority={i === 0 ? "high" : undefined}
                    />
                  </span>
                  <span className="hero-work__name latin">{p.title}</span>
                  <span className="hero-work__sub">{p.sub}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
