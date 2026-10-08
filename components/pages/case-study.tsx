"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Arrow } from "@/components/arrow";
import { Latin } from "@/components/lang/latin";
import { useT } from "@/components/lang/provider";
import { FlowDiagram } from "@/components/flow-diagram";
import { ProjectImage } from "@/components/project-image";
import { ProjectLink } from "@/components/project-link";
import { Beat, Outcome } from "@/components/work-featured";
import { contactHref } from "@/components/contact-intent";
import { useReveal } from "@/components/theme/use-reveal";
import { FEATURED } from "@/lib/projects";
import { homePath, workPath } from "@/lib/i18n";
import { trackAttrs } from "@/lib/analytics";

/**
 * One featured project on its own URL, so it can be shared, linked from a
 * proposal and found by search. The page grows with the content: context,
 * challenges, "what I'd do differently", an outcome and a client quote each
 * render only once they exist in strings.ts — nothing here is padding.
 */
export function CaseStudyPage({ slug }: { slug: string }) {
  const { t, lang } = useT();
  useReveal();

  const index = FEATURED.findIndex((m) => m.slug === slug);
  const meta = FEATURED[index];
  const project = t.works.featured[index];
  const nextIndex = (index + 1) % FEATURED.length;
  const next = { meta: FEATURED[nextIndex], project: t.works.featured[nextIndex] };

  const W = t.works;
  const CS = t.case;
  const extra = project.caseStudy;
  const home = homePath(lang);
  const diagram = meta.diagram ? t.misc.diagrams[meta.diagram] : undefined;
  const quote = t.testimonials.items.find((q) => q.project === slug);

  return (
    <>
      <a className="skip-link" href="#main">
        {t.misc.skip}
      </a>
      <Header />
      <main id="main">
        <article>
          <header className="container-edge cs-head">
            <a href={`${home}#${slug}`} className="mono tap cs-back">
              <Arrow size={12} back />
              {CS.back}
            </a>

            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "28px 0 14px" }}>
              <Latin as="span" className="mono accent">
                <span style={{ fontSize: 12, letterSpacing: "0.14em" }}>{project.n}</span>
              </Latin>
              <span className="rule" style={{ flex: 1 }} />
              <Latin as="span" className="mono">
                <span style={{ fontSize: 11.5, letterSpacing: "0.1em", color: "var(--fg-dim)" }}>
                  {project.year}
                </span>
              </Latin>
            </div>

            <h1 className="d1 latin">{project.title}</h1>
            <p className="lead" style={{ marginTop: 14, maxWidth: "36ch" }}>
              {project.kicker}
            </p>

            <div className="cs-meta">
              <span className="eyebrow">
                {W.label_role} — {project.role}
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {project.stack.map((s) => (
                  <span key={s} className="chip latin">
                    {s}
                  </span>
                ))}
              </div>
              <span style={{ marginInlineStart: "auto" }}>
                <ProjectLink meta={meta} />
              </span>
            </div>
          </header>

          <div className="container-edge">
            <div className="proj-media cs-hero-media">
              <ProjectImage
                image={meta.image}
                title={project.title}
                swatch={meta.swatch}
                alt={t.misc.screenshot_alt(project.title)}
                priority
                variant="feature"
                diagram={diagram}
              />
            </div>
          </div>

          <section className="container-edge">
            <div className="cs-section" style={{ borderTop: 0 }}>
              {project.outcome && <Outcome label={W.outcome_label} text={project.outcome} />}
              <div className="cs-beats" data-reveal>
                <Beat label={W.label_problem} text={project.problem} />
                <Beat label={W.label_built} text={project.built} />
                <Beat label={W.label_decision} text={project.decision} isKey />
              </div>
            </div>
          </section>

          {diagram && meta.image && (
            <TextSection label={CS.architecture}>
              <div className="cs-diagram">
                <FlowDiagram diagram={diagram} />
              </div>
            </TextSection>
          )}

          {extra?.context && (
            <TextSection label={CS.context}>
              <p className="lead">{extra.context}</p>
            </TextSection>
          )}

          {!!extra?.challenges?.length && (
            <TextSection label={CS.challenges}>
              <div style={{ display: "grid", gap: 28 }}>
                {extra.challenges.map((c) => (
                  <div key={c.title}>
                    <h3 style={{ margin: 0, fontSize: 19, fontWeight: 500 }}>{c.title}</h3>
                    <p className="body dim" style={{ marginTop: 8 }}>
                      {c.body}
                    </p>
                  </div>
                ))}
              </div>
            </TextSection>
          )}

          {extra?.differently && (
            <TextSection label={CS.differently}>
              <p className="body">{extra.differently}</p>
            </TextSection>
          )}

          {meta.image && (
            <TextSection label={CS.gallery}>
              <div className="cs-gallery">
                <figure>
                  <img
                    src={`/work/${meta.image}-1440.webp`}
                    srcSet={`/work/${meta.image}-720.webp 720w, /work/${meta.image}-1440.webp 1440w`}
                    sizes="(max-width: 720px) 100vw, 60vw"
                    width={1440}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    alt={`${t.misc.screenshot_alt(project.title)} — ${CS.desktop}`}
                  />
                  <figcaption className="eyebrow">{CS.desktop}</figcaption>
                </figure>
                <figure>
                  <img
                    src={`/work/${meta.image}-m780.webp`}
                    srcSet={`/work/${meta.image}-m390.webp 390w, /work/${meta.image}-m780.webp 780w`}
                    sizes="(max-width: 720px) 60vw, 22vw"
                    width={390}
                    height={520}
                    loading="lazy"
                    decoding="async"
                    alt={`${t.misc.screenshot_alt(project.title)} — ${CS.mobile}`}
                  />
                  <figcaption className="eyebrow">{CS.mobile}</figcaption>
                </figure>
              </div>
            </TextSection>
          )}

          {quote && (
            <section className="container-edge" data-reveal>
              <figure className="cs-section" style={{ margin: 0 }}>
                <blockquote className="statement" style={{ margin: 0, maxWidth: "32ch" }}>
                  “{quote.quote}”
                </blockquote>
                <figcaption style={{ marginTop: 16, fontSize: 14 }}>
                  <span style={{ fontWeight: 500 }}>{quote.name}</span>
                  <span className="dim"> · {quote.role}</span>
                </figcaption>
              </figure>
            </section>
          )}

          <section className="band section-y" style={{ marginTop: 40 }}>
            <div className="container-edge" data-reveal>
              <h2 className="d2" style={{ maxWidth: "16ch" }}>
                {CS.cta_pre}
                <span className="em">{CS.cta_em}</span>
                {CS.cta_post}
              </h2>
              <p className="lead dim" style={{ marginTop: 18, maxWidth: "44ch" }}>
                {CS.cta_body}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
                <a
                  href={contactHref(home, "project")}
                  className="btn btn-primary"
                  {...trackAttrs("case_cta_project", { project: slug })}
                >
                  {t.hero.cta_project}
                  <Arrow />
                </a>
                <a
                  href={`${home}#cv`}
                  className="btn btn-ghost"
                  {...trackAttrs("case_cta_hiring", { project: slug })}
                >
                  {t.hero.cta_hiring}
                </a>
              </div>
            </div>
          </section>

          <nav className="container-edge cs-next" aria-label={CS.next}>
            <a
              href={workPath(lang, next.meta.slug)}
              {...trackAttrs("case_study_open", { project: next.meta.slug, from: "next" })}
            >
              <span className="eyebrow">{CS.next}</span>
              <span className="cs-next-title">
                <span className="latin">{next.project.title}</span>
                <Arrow size={22} />
              </span>
              <span className="dim" style={{ fontSize: 15 }}>
                {next.project.kicker}
              </span>
            </a>
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}

function TextSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="container-edge" data-reveal>
      <div className="cs-section cs-text">
        <div className="eyebrow">{label}</div>
        <div>{children}</div>
      </div>
    </section>
  );
}
