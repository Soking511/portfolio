"use client";

import { useRef, useState } from "react";
import { useT } from "@/components/lang/provider";
import { Arrow } from "@/components/arrow";
import { ProjectLink } from "@/components/project-link";
import { ProjectPanel } from "@/components/project-panel";
import { SectionHead } from "@/components/section-head";
import { WorkSelected } from "@/components/work-selected";
import { FEATURED } from "@/lib/projects";
import { workPath } from "@/lib/i18n";
import { trackAttrs } from "@/lib/analytics";
import type { FeaturedWork } from "@/components/lang/strings";
import { MOTION_PHONE, MOTION_WIDE, gsap, useGSAP } from "@/lib/gsap";

/**
 * The featured projects as picture tiles, two to a row: the screenshot (or
 * the diagram that stands in for one), then its name, the year, one line
 * saying what it is, and two ways on: the case study, which the whole tile
 * opens and which holds the problem, my part and the decision, and the live
 * site where there is one. Nothing here needs JavaScript.
 *
 * In the grid, each picture rises into its panel as the tile is scrolled
 * into view, and sinks back if the page is scrolled away again: the panel's
 * own idea (a screenshot rising from its bottom edge), followed by the
 * scroll. The second column lands a little after the first.
 *
 * On phones the same idea follows the thumb instead: the picture of the
 * tile in view is up, the one peeking in from the side sits lower, and it
 * rises as it is swiped into place.
 *
 * On phones the tiles are one row to swipe, the next always peeking in, with
 * a row of marks under it that show where you are and jump to any project.
 * A button either side of the marks moves one project at a time: not
 * everyone thinks to swipe, and a button says it can be done.
 *
 * The remaining projects follow as three small tiles.
 */
export function WorkFeatured() {
  const { t, lang } = useT();
  const W = t.works;

  // Phones show the tiles as one row to swipe. These two follow that row:
  // which tile is at its start, for the marks under it, and a way to bring
  // any tile there. Elsewhere the list does not scroll and neither is used.
  const listRef = useRef<HTMLUListElement>(null);
  const [inView, setInView] = useState(0);
  const onScroll = () => {
    const list = listRef.current;
    const first = list?.firstElementChild as HTMLElement | null;
    if (!list || !first) return;
    const step = first.offsetWidth + parseFloat(getComputedStyle(list).columnGap || "0");
    // Right-to-left rows scroll into negative numbers.
    const i = Math.round(Math.abs(list.scrollLeft) / step);
    setInView(Math.max(0, Math.min(W.featured.length - 1, i)));
  };
  const show = (i: number) =>
    listRef.current?.children[i]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });

  useGSAP(() => {
    const list = listRef.current;
    if (!list) return;
    const mm = gsap.matchMedia();

    // Phones: the tiles are one row swiped sideways, so the picture follows
    // the swipe. Each sits lower the further its tile is from the middle of
    // the row. Measured from where the tiles are on screen rather than from
    // the scroll offset, which runs negative in Arabic.
    mm.add(MOTION_PHONE, () => {
      const tiles = Array.from(list.children) as HTMLElement[];
      const pictures = tiles.map((tile) => tile.querySelector<HTMLElement>(".panel__rise, .flow"));
      const lower = pictures.map((picture) => (picture ? gsap.quickSetter(picture, "yPercent") : null));
      let frame = 0;
      const place = () => {
        frame = 0;
        // Every measurement first, then every move, so the browser lays the
        // row out once per frame instead of once per tile.
        const row = list.getBoundingClientRect();
        const middle = row.left + row.width / 2;
        const away = tiles.map((tile) => {
          const box = tile.getBoundingClientRect();
          return Math.abs(box.left + box.width / 2 - middle) / box.width;
        });
        // The tile in view rests a little off the middle (it lines up with
        // the page's gutter, not the centre); that still counts as "up".
        away.forEach((a, i) => lower[i]?.(gsap.utils.clamp(0, 1, (a - 0.12) / 0.8) * 28));
      };
      const onMove = () => {
        if (!frame) frame = requestAnimationFrame(place);
      };
      place();
      list.addEventListener("scroll", onMove, { passive: true });
      window.addEventListener("resize", onMove, { passive: true });
      return () => {
        list.removeEventListener("scroll", onMove);
        window.removeEventListener("resize", onMove);
        if (frame) cancelAnimationFrame(frame);
        gsap.set(pictures.filter(Boolean), { clearProps: "transform" });
      };
    });

    // Wider: the tiles are a grid, so the picture follows the page's scroll.
    mm.add(MOTION_WIDE, () => {
      Array.from(list.children).forEach((tile, i) => {
        const picture = tile.querySelector(".panel__rise, .flow");
        if (!picture) return;
        gsap.fromTo(
          picture,
          { yPercent: 30 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: tile,
              start: "top bottom",
              end: i % 2 ? "top 46%" : "top 58%",
              scrub: 0.5,
            },
          },
        );
      });
    });
  }, []);

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <SectionHead id="work-title" title={W.title} intro={W.intro} />

        <ul className="work-grid" ref={listRef} onScroll={onScroll}>
          {W.featured.map((project, i) => {
            const meta = FEATURED[i];
            const caseHref = workPath(lang, meta.slug);
            const diagram = meta.diagram ? t.misc.diagrams[meta.diagram] : undefined;
            return (
              <li key={meta.slug} id={meta.slug} className="tile">
                <ProjectPanel
                  meta={meta}
                  title={project.title}
                  diagram={diagram}
                  compact
                  priority={i === 0}
                  style={{ viewTransitionName: `media-${meta.slug}` }}
                />
                <h3 className="h3 tile__title" style={{ viewTransitionName: `title-${meta.slug}` }}>
                  <a
                    href={caseHref}
                    className="latin"
                    {...trackAttrs("case_study_open", { project: meta.slug, from: "home" })}
                  >
                    {project.title}
                  </a>
                </h3>
                <span className="tile__year">{project.year}</span>
                <p className="tile__kicker">{project.kicker}</p>
                <p className="tile__foot">
                  <span className="tile__more" aria-hidden="true">
                    {W.case_study}
                  </span>
                  <span className="tile__link">
                    <ProjectLink meta={meta} />
                  </span>
                </p>
              </li>
            );
          })}
        </ul>

        <div className="work-marks" role="group" aria-label={W.title}>
          <button
            type="button"
            className="work-step"
            aria-label={W.prev_project}
            disabled={inView === 0}
            onClick={() => show(inView - 1)}
          >
            <Arrow size={18} back />
          </button>
          {W.featured.map((project, i) => (
            <button
              key={FEATURED[i].slug}
              type="button"
              className="work-mark"
              aria-label={project.title}
              aria-current={i === inView ? "true" : undefined}
              onClick={() => show(i)}
            >
              <span />
            </button>
          ))}
          <button
            type="button"
            className="work-step"
            aria-label={W.next_project}
            disabled={inView === W.featured.length - 1}
            onClick={() => show(inView + 1)}
          >
            <Arrow size={18} />
          </button>
        </div>

        <WorkSelected />
      </div>
    </section>
  );
}

/**
 * The answers every case study gives, one per row: who uses it (once that is
 * true), the problem, what it is, what I did, and the decision that mattered.
 */
export function Answers({
  project,
  labels,
}: {
  project: FeaturedWork;
  labels: ReturnType<typeof useT>["t"]["works"];
}) {
  return (
    <dl className="answers">
      {project.outcome && (
        <div>
          <dt>{labels.outcome_label}</dt>
          <dd className="lead">{project.outcome}</dd>
        </div>
      )}
      <div>
        <dt>{labels.label_problem}</dt>
        <dd>{project.problem}</dd>
      </div>
      <div>
        <dt>{labels.label_built}</dt>
        <dd>{project.built}</dd>
      </div>
      <div>
        <dt>{labels.label_contribution}</dt>
        <dd>{project.contribution}</dd>
      </div>
      <div className="answers__key">
        <dt>{labels.label_decision}</dt>
        <dd>{project.decision}</dd>
      </div>
    </dl>
  );
}
