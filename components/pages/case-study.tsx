"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Arrow } from "@/components/arrow";
import { useT } from "@/components/lang/provider";
import { FlowDiagram } from "@/components/flow-diagram";
import { ProjectPanel } from "@/components/project-panel";
import { ProjectLink } from "@/components/project-link";
import { Answers } from "@/components/work-featured";
import { contactHref } from "@/components/contact-intent";
import { FEATURED } from "@/lib/projects";
import { homePath, workPath } from "@/lib/i18n";
import { trackAttrs } from "@/lib/analytics";

/**
 * One featured project on its own URL, so it can be shared, linked from a
 * proposal and found by search. It answers the same questions as the home
 * page — with the problem in front — and grows with the content: context,
 * challenges, "what I'd do differently", an outcome and a client quote each
 * render only once they exist in strings.ts. Nothing here is padding.
 */
export function CaseStudyPage({ slug }: { slug: string }) {
  const { t, lang } = useT();

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
  const nextDiagram = next.meta.diagram ? t.misc.diagrams[next.meta.diagram] : undefined;

  return (
    <>
      <a className="skip-link" href="#main">
        {t.misc.skip}
      </a>
      <Header />
      <main id="main">
        <article aria-labelledby="cs-title">
          {/* Title, facts, picture. One grid, so a phone can put the picture
              ahead of the facts: there the picture belongs on the first screen. */}
          <div className="cs-top">
            <header className="container cs-head">
              <a href={`${home}#${slug}`} className="back-link">
                <Arrow size={14} back />
                {CS.back}
              </a>

              <h1 className="cs-title latin" id="cs-title" style={{ viewTransitionName: `title-${slug}` }}>
                {project.title}
              </h1>
              <p className="lead soft cs-kicker">{project.kicker}</p>
            </header>
            <div className="container cs-top__facts">
              {/* The same row of facts as the home page's first screen: what a
                  reader checks before deciding to read on. */}
              <dl className="facts cs-facts">
                <div className="fact">
                  <dt className="label">{W.label_role}</dt>
                  <dd>{project.role}</dd>
                </div>
                <div className="fact">
                  <dt className="label">{W.label_year}</dt>
                  <dd>{project.year}</dd>
                </div>
                <div className="fact">
                  <dt className="label">{W.label_stack}</dt>
                  <dd>
                    <ul className="tags">
                      {project.stack.map((s) => (
                        <li key={s} className="tag">
                          <span className="latin">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div className="fact">
                  <dt className="label">{W.label_link}</dt>
                  <dd>
                    <ProjectLink meta={meta} />
                  </dd>
                </div>
              </dl>
            </div>
            <div className="container cs-top__media">
              <ProjectPanel
                meta={meta}
                title={project.title}
                alt={t.misc.screenshot_alt(project.title)}
                diagram={diagram}
                priority
                className="cs-hero-media"
                style={{ viewTransitionName: `media-${slug}` }}
              />
            </div>
          </div>

          <section className="container" aria-label={project.title}>
            <div className="cs-section cs-section--first">
              <Answers project={project} labels={W} />
            </div>
          </section>

          {diagram && meta.image && (
            <TextSection label={CS.architecture}>
              <div className="panel panel--diagram panel--free">
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
              <div className="cs-challenges">
                {extra.challenges.map((c) => (
                  <div key={c.title}>
                    <h3 className="h3">{c.title}</h3>
                    <p className="soft">
                      {c.body}
                    </p>
                  </div>
                ))}
              </div>
            </TextSection>
          )}

          {extra?.differently && (
            <TextSection label={CS.differently}>
              <p>{extra.differently}</p>
            </TextSection>
          )}

          {meta.image && (
            <TextSection label={CS.gallery} className="cs-phone-view">
              <div className="cs-gallery">
                <img
                  src={`/work/${meta.image}-m780.webp`}
                  srcSet={`/work/${meta.image}-m390.webp 390w, /work/${meta.image}-m780.webp 780w`}
                  sizes="320px"
                  width={390}
                  height={520}
                  loading="lazy"
                  decoding="async"
                  alt={`${t.misc.screenshot_alt(project.title)} — ${CS.mobile}`}
                />
              </div>
            </TextSection>
          )}

          {quote && (
            <section className="container">
              <figure className="cs-section quote">
                <blockquote>“{quote.quote}”</blockquote>
                <figcaption>
                  <strong>{quote.name}</strong>
                  <span className="soft">, {quote.role}</span>
                </figcaption>
              </figure>
            </section>
          )}

          <section className="section section--surface cs-cta" aria-labelledby="cs-cta">
            <div className="container">
              <h2 className="h2" id="cs-cta">
                {CS.cta_title.replace("{project}", project.title)}
              </h2>
              <p className="lead soft">{CS.cta_body}</p>
              <div className="actions">
                <a
                  href={contactHref(home, "project")}
                  className="btn btn--primary"
                  {...trackAttrs("case_cta_project", { project: slug })}
                >
                  {t.hero.cta_project}
                </a>
                <a
                  href={`${home}#cv`}
                  className="btn btn--secondary"
                  {...trackAttrs("case_cta_hiring", { project: slug })}
                >
                  {t.hero.cta_hiring}
                </a>
              </div>
            </div>
          </section>

          <nav className="container cs-next" aria-label={CS.next}>
            {/* The next project is shown, not only named, and a click carries
                its picture and title to the top of its own page. */}
            <a
              href={workPath(lang, next.meta.slug)}
              className="cs-next__link"
              {...trackAttrs("case_study_open", { project: next.meta.slug, from: "next" })}
            >
              <span className="cs-next__text">
                <span className="label">{CS.next}</span>
                <span
                  className="cs-next__title latin"
                  style={{ viewTransitionName: `title-${next.meta.slug}` }}
                >
                  {next.project.title}
                </span>
                <span className="soft">{next.project.kicker}</span>
              </span>
              <ProjectPanel
                meta={next.meta}
                title={next.project.title}
                diagram={nextDiagram}
                compact
                className="cs-next__panel"
                style={{ viewTransitionName: `media-${next.meta.slug}` }}
              />
            </a>
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}

function TextSection({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`container ${className}`.trim()} aria-label={label}>
      <div className="cs-section cs-text">
        <h2 className="label">{label}</h2>
        <div>{children}</div>
      </div>
    </section>
  );
}
