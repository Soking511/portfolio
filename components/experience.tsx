"use client";

import { useT } from "@/components/lang/provider";
import { useContactIntent } from "@/components/contact-intent";
import { SectionHead } from "@/components/section-head";
import { GITHUB_URL, LINKEDIN_URL, RESUME_PATH } from "@/lib/site";
import { trackAttrs } from "@/lib/analytics";

/**
 * Where the hero's "See my résumé" lands. The heading's row holds the PDF;
 * under it, the positions run as one line through time, newest first, each
 * a stop on the line. Below that, the rest of a recruiter's kit: a way to
 * open the form already set to "a role", LinkedIn and GitHub.
 */
export function Experience() {
  const { t } = useT();
  const { setIntent } = useContactIntent();
  const E = t.cv;

  return (
    <section id="cv" className="section" aria-labelledby="cv-title">
      <div className="container">
        <SectionHead id="cv-title" title={E.title} intro={E.intro}>
          <a
            href={RESUME_PATH}
            download
            className="btn btn--primary"
            {...trackAttrs("resume_download", { from: "cv" })}
          >
            {E.download}
          </a>
        </SectionHead>

        <ol className="cv-rows">
          {E.rows.map((r) => (
            <li key={`${r.years}-${r.role}`} className="cv-row">
              <p className="cv-row__years">{r.years}</p>
              <h3 className="h3">{r.role}</h3>
              <p className="cv-row__org">
                {r.org}, {r.loc}
              </p>
              <p className="cv-row__blurb">{r.blurb}</p>
            </li>
          ))}
        </ol>

        <p className="recruiter__links">
          <span>{E.recruiter_line}</span>
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
        </p>
      </div>
    </section>
  );
}
