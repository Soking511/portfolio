"use client";

import { useT } from "@/components/lang/provider";
import { SectionHead } from "@/components/section-head";
import { formatNoteDate, notesIn } from "@/content/notes/meta";
import { notesPath } from "@/lib/i18n";

/**
 * The three newest notes, placed after "How I work" because each note is the
 * long version of an opinion stated there. Absent until the first is written.
 */
export function NotesStrip() {
  const { t, lang } = useT();
  const notes = notesIn(lang).slice(0, 3);
  if (!notes.length) return null;

  return (
    <section className="section notes-strip" aria-labelledby="notes-strip-title">
      <div className="container">
        <SectionHead id="notes-strip-title" title={t.notes.latest} />
        <ol className="notes-list">
          {notes.map((note) => (
            <li key={note.slug}>
              <a href={notesPath(lang, note.slug)}>
                <time dateTime={note.date}>{formatNoteDate(lang, note.date)}</time>
                <span className="notes-list-title">{note.title}</span>
                <span className="soft">{note.description}</span>
              </a>
            </li>
          ))}
        </ol>
        <p className="notes-strip__all">
          <a href={notesPath(lang)} className="link">
            {t.notes.all}
          </a>
        </p>
      </div>
    </section>
  );
}
