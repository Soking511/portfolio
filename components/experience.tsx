"use client";

import { useT } from "@/components/lang/provider";
import { useContactIntent } from "@/components/contact-intent";
import { GITHUB_URL, LINKEDIN_URL, RESUME_PATH } from "@/lib/site";
import { trackAttrs } from "@/lib/analytics";

/**
 * Where the hero's "See my résumé" lands. Beside the section's name sits a
 * recruiter's whole kit: availability, the PDF, a way to open the form
 * already set to "a role", LinkedIn and GitHub. It stays in view while the
 * experience is read: one row per position, newest first, years in front.
 */
export function Experience() {
  const { t } = useT();
  const { setIntent } = useContactIntent();
  const E = t.cv;

  return (
    <section id="cv" className="section" aria-labelledby="cv-title">
      <div className="container split">
        <div className="split__head">
          <header className="section-head">
            <h2 className="h2" id="cv-title">
              {E.title}
            </h2>
            <p className="lead">{E.intro}</p>
          </header>

          <div className="recruiter">
            <p>{E.recruiter_line}</p>
            <a
              href={RESUME_PATH}
              download
              className="btn btn--primary"
              {...trackAttrs("resume_download", { from: "cv" })}
            >
              {E.download}
            </a>
            <span className="recruiter__links">
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
        </div>

        <ol className="cv-rows">
          {E.rows.map((r) => (
            <li key={`${r.years}-${r.role}`} className="cv-row">
              <p className="cv-row__years">{r.years}</p>
              <h3 className="h3">{r.role}</h3>
              <p className="cv-row__org">
                {r.org}, {r.loc}
              </p>
              <div className="cv-row__body">
                <p className="measure">{r.blurb}</p>
                <ul className="tags">
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
      </div>
    </section>
  );
}
