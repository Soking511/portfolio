"use client";

import { useT } from "@/components/lang/provider";
import { useContactIntent } from "@/components/contact-intent";
import { GITHUB_URL, LINKEDIN_URL, RESUME_PATH } from "@/lib/site";
import { trackAttrs } from "@/lib/analytics";
import { NextLink } from "@/components/next-link";

/**
 * Where the hero's "See my résumé" lands, so the top of this section is a
 * recruiter's whole kit: availability, the PDF, GitHub, LinkedIn, and a way
 * to open the form already set to "a role". Below it, the experience as a
 * timeline — it is one, newest first.
 */
export function Experience() {
  const { t } = useT();
  const { setIntent } = useContactIntent();
  const E = t.cv;

  return (
    <section id="cv" className="section section--surface" aria-labelledby="cv-title">
      <div className="container">
        <header className="section-head">
          <h2 className="h2" id="cv-title">
            {E.title}
          </h2>
          <p className="lead">{E.intro}</p>
        </header>

        <div className="recruiter">
          <p>{E.recruiter_line}</p>
          <span className="recruiter__links">
            <a
              href={RESUME_PATH}
              download
              className="btn btn--primary"
              {...trackAttrs("resume_download", { from: "cv" })}
            >
              {E.download}
            </a>
            <a
              href="#contact"
              className="link tap"
              onClick={() => setIntent("role")}
              {...trackAttrs("cv_role_cta")}
            >
              {E.role_cta}
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link tap latin"
              {...trackAttrs("profile_click", { network: "linkedin", from: "cv" })}
            >
              LinkedIn
              <span className="visually-hidden"> {t.misc.new_tab}</span>
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link tap latin"
              {...trackAttrs("profile_click", { network: "github", from: "cv" })}
            >
              GitHub
              <span className="visually-hidden"> {t.misc.new_tab}</span>
            </a>
          </span>
        </div>

        <ol className="timeline">
          {E.rows.map((r) => (
            <li key={`${r.years}-${r.role}`} className="timeline__item">
              <p className="timeline__years">{r.years}</p>
              <h3 className="h3">{r.role}</h3>
              <p className="timeline__org">
                {r.org}, {r.loc}
              </p>
              <div>
                <p className="measure">{r.blurb}</p>
                <ul className="tags" style={{ marginTop: 12 }}>
                  {r.tags.map((tag) => (
                    <li key={tag} className="tag">
                      <span className="latin">{tag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
        <NextLink href="#contact" label={t.contact.title} />
      </div>
    </section>
  );
}
