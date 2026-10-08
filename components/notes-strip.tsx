"use client";

import { useT } from "@/components/lang/provider";
import { Arrow } from "@/components/arrow";
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
    <section className="band section-tight">
      <div className="container-edge">
        <div
          data-reveal
          style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}
        >
          <span className="eyebrow">{t.notes.latest}</span>
          <span className="rule" style={{ flex: 1 }} />
          <a href={notesPath(lang)} className="tap" style={{ gap: 8, fontSize: 14 }}>
            {t.notes.all}
            <Arrow size={12} />
          </a>
        </div>
        <ol className="notes-list notes-list--strip">
          {notes.map((note) => (
            <li key={note.slug} data-reveal>
              <a href={notesPath(lang, note.slug)}>
                <time className="mono dim" dateTime={note.date}>
                  {formatNoteDate(lang, note.date)}
                </time>
                <span className="notes-list-title">{note.title}</span>
                <span className="body dim">{note.description}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
