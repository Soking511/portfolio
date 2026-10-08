"use client";

import { useT } from "@/components/lang/provider";
import { Latin } from "@/components/lang/latin";
import { useContactIntent } from "@/components/contact-intent";
import { Arrow } from "@/components/arrow";
import { GITHUB_URL, LINKEDIN_URL, RESUME_PATH } from "@/lib/site";

/**
 * Where the hero's "Hiring?" button lands, so the top of this section is the
 * recruiter's whole kit: availability, the PDF, GitHub, LinkedIn, and a way
 * to open the form already set to "a role".
 *
 * On phones each entry is a single column: years as an accent label, then
 * role, org, one line, chips. The previous grid kept a 150px text column
 * below 1080px, which left the description two words wide on a phone.
 */
export function Experience() {
  const { t } = useT();
  const { setIntent } = useContactIntent();
  const E = t.cv;

  return (
    <section id="cv" className="section-tight">
      <div className="container-edge">
        <div
          data-reveal
          style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}
        >
          <span className="eyebrow">{E.eyebrow}</span>
          <span className="rule" style={{ flex: 1 }} />
        </div>

        <div
          data-reveal
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 18,
            marginBottom: 20,
          }}
        >
          <h2 className="d2">
            {E.headline_pre}
            <span className="em">{E.headline_em}</span>
            {E.headline_post}
          </h2>
          <a href={RESUME_PATH} download className="btn btn-ghost">
            {E.download}
          </a>
        </div>

        <div data-reveal className="cv-recruiter">
          <p style={{ margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
            <span className="status-dot" aria-hidden="true" />
            {E.recruiter_line}
          </p>
          <span className="cv-recruiter-links">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="latin tap">
              GitHub ↗
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="latin tap">
              LinkedIn ↗
            </a>
            <a
              href="#contact"
              className="tap accent"
              style={{ gap: 8 }}
              onClick={() => setIntent("role")}
            >
              {E.role_cta}
              <Arrow size={12} />
            </a>
          </span>
        </div>

        <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {E.rows.map((r) => (
            <li
              key={`${r.years}-${r.role}`}
              data-reveal
              className="r-cv-row"
              style={{ paddingBlock: 24, borderTop: "1px solid var(--rule)" }}
            >
              <Latin as="div" className="mono accent">
                <span style={{ fontSize: 11.5, letterSpacing: "0.1em" }}>{r.years}</span>
              </Latin>

              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "clamp(20px, 5.2vw, 25px)",
                    fontWeight: 500,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.15,
                  }}
                >
                  {r.role}
                </h3>
                <p className="dim" style={{ margin: "4px 0 0", fontSize: 14 }}>
                  {r.org} · {r.loc}
                </p>
              </div>

              <div>
                <p className="body dim" style={{ maxWidth: "58ch", fontSize: 15 }}>
                  {r.blurb}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
                  {r.tags.map((tag) => (
                    <span key={tag} className="chip latin">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
