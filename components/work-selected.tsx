"use client";

import { useT } from "@/components/lang/provider";
import { ProjectLink } from "@/components/project-link";
import { SELECTED } from "@/lib/projects";

/**
 * The remaining projects, as a short list under the index: a name, what it
 * is in a few lines, its tools and where it lives. No pictures; after six
 * featured projects, more frames would only add length.
 */
export function WorkSelected() {
  const { t } = useT();
  const W = t.works;

  return (
    <div id="shipped" className="shipped" role="group" aria-labelledby="shipped-title">
      <header className="shipped__head">
        <h3 className="h3" id="shipped-title">
          {W.selected_headline}
        </h3>
        <p className="soft">{W.selected_note}</p>
      </header>

      <ul className="shipped__list">
        {W.selected.map((p, i) => {
          const meta = SELECTED[i];
          return (
            <li key={meta.slug} id={meta.slug} className="shipped__item">
              <div>
                <h4 className="h3 shipped__name">{p.title}</h4>
                <p className="shipped__kicker">{p.kicker}</p>
              </div>

              <p>{p.blurb}</p>

              <div className="shipped__meta">
                <ul className="tags" aria-label={W.label_stack}>
                  {p.stack.map((s) => (
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
