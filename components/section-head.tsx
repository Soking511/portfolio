import type { ReactNode } from "react";

/**
 * A section opens with a plain heading (a sentence, not a styled phrase)
 * and, when it helps, one line saying what the section is for. A section's
 * main action, if it has one, sits on the far side of the same row.
 */
export function SectionHead({
  id,
  title,
  intro,
  children,
}: {
  /** Set when the heading labels its section (aria-labelledby). */
  id?: string;
  title: string;
  intro?: string;
  /** The section's action: a button or a few links. */
  children?: ReactNode;
}) {
  return (
    <header className="section-head">
      <div className="section-head__text">
        <h2 className="h2" id={id}>
          {title}
        </h2>
        {intro && <p className="lead">{intro}</p>}
      </div>
      {children}
    </header>
  );
}
