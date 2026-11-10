"use client";

import { useState } from "react";
import { useT } from "@/components/lang/provider";
import { FlowDiagram } from "@/components/flow-diagram";
import { FEATURED } from "@/lib/projects";
import { workPath } from "@/lib/i18n";
import { trackAttrs } from "@/lib/analytics";

/**
 * The work on the first screen, one project at a time: its picture, its
 * name, and a row of marks that show which project is up and let the
 * visitor pick another. The picture opens that project's case study.
 *
 * The projects take turns on their own. The turn is a CSS animation on the
 * current mark (it fills as the turn runs), and its end is what advances the
 * showcase, so the two can never disagree. Pointing at the showcase or
 * focusing it pauses that animation and so holds the turn; choosing a
 * project by hand ends the turns for good. Under reduced motion the
 * animation does not exist, so nothing advances.
 */
export function HeroShowcase() {
  const { t, lang } = useT();
  const W = t.works;
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  const current = W.featured[active];
  const currentMeta = FEATURED[active];

  return (
    <div className="showcase" data-auto={auto}>
      <a
        href={workPath(lang, currentMeta.slug)}
        className="panel showcase__panel"
        aria-label={`${W.case_study}: ${current.title}`}
        {...trackAttrs("case_study_open", { project: currentMeta.slug, from: "hero" })}
      >
        {W.featured.map((project, i) => {
          const meta = FEATURED[i];
          const diagram = meta.diagram ? t.misc.diagrams[meta.diagram] : undefined;
          return (
            <div key={meta.slug} className="showcase__item" data-active={i === active} aria-hidden="true">
              {meta.image ? (
                <div className="panel__shot">
                  {/* All lazy: phones hide the showcase, and a lazy image in
                      a hidden box is never fetched. */}
                  <img
                    src={`/work/${meta.image}-720.webp`}
                    srcSet={`/work/${meta.image}-720.webp 720w, /work/${meta.image}-1440.webp 1440w`}
                    sizes="(max-width: 960px) 85vw, 440px"
                    width={1440}
                    height={900}
                    alt=""
                    decoding="async"
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                  />
                </div>
              ) : (
                diagram && <FlowDiagram diagram={diagram} compact />
              )}
            </div>
          );
        })}
      </a>

      <div className="showcase__bar">
        <p className="showcase__caption">
          <span className="showcase__name latin">{current.title}</span>
          <span className="showcase__kicker">{current.kicker}</span>
        </p>
        <div className="showcase__marks" role="group" aria-label={W.title}>
          {W.featured.map((project, i) => (
            <button
              key={FEATURED[i].slug}
              type="button"
              className="showcase__mark"
              aria-label={project.title}
              aria-current={i === active ? "true" : undefined}
              onClick={() => {
                setActive(i);
                setAuto(false);
              }}
            >
              <span>
                <i onAnimationEnd={() => setActive((n) => (n + 1) % W.featured.length)} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
