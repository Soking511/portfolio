/**
 * A section opens with a plain heading — a sentence, not a styled phrase —
 * and, when it helps, one line saying what the section is for.
 */
export function SectionHead({
  id,
  title,
  intro,
}: {
  /** Set when the heading labels its section (aria-labelledby). */
  id?: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="section-head">
      <h2 className="h2" id={id}>
        {title}
      </h2>
      {intro && <p className="lead">{intro}</p>}
    </header>
  );
}
