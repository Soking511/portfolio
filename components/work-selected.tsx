"use client";

import { useRef } from "react";
import { useT } from "@/components/lang/provider";
import { ProjectLink } from "@/components/project-link";
import { SELECTED } from "@/lib/projects";
import { MOTION_PHONE, gsap, landEach, useGSAP } from "@/lib/gsap";

/**
 * The remaining projects as three small tiles under the main grid: a name,
 * one line, its tools and where it lives. No pictures and no long text;
 * after six featured projects, more of either would only add length.
 *
 * On a phone, where they are a stack, each lands as it is scrolled to.
 */
export function WorkSelected() {
  const { t } = useT();
  const W = t.works;

  const listRef = useRef<HTMLUListElement>(null);
  useGSAP(() => {
    const list = listRef.current;
    if (!list) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_PHONE, () => landEach(Array.from(list.children)));
  }, []);

  return (
    <div id="shipped" className="shipped" role="group" aria-labelledby="shipped-title">
      <header className="shipped__head">
        <h3 className="h3" id="shipped-title">
          {W.selected_headline}
        </h3>
        <p className="soft">{W.selected_note}</p>
      </header>

      <ul className="shipped__list" ref={listRef}>
        {W.selected.map((p, i) => {
          const meta = SELECTED[i];
          return (
            <li key={meta.slug} id={meta.slug} className="shipped__item">
              <h4 className="h3">{p.title}</h4>
              <p className="shipped__kicker">{p.kicker}</p>
              <div className="shipped__meta">
                <ul className="tags" aria-label={W.label_stack}>
                  {p.stack.slice(0, 3).map((s) => (
                    <li key={s} className="tag">
                      <span className="latin">{s}</span>
                    </li>
                  ))}
                </ul>
                <ProjectLink meta={meta} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
