"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useT } from "@/components/lang/provider";
import { formatNoteDate, notesIn } from "@/content/notes/meta";
import { localize, notesPath } from "@/lib/i18n";

/** Every note in this language, newest first. */
export function NotesIndexPage() {
  const { t, lang } = useT();
  const N = t.notes;
  const notes = notesIn(lang);

  return (
    <>
      <a className="skip-link" href="#main">
        {t.misc.skip}
      </a>
      <Header />
      <main id="main" className="container notes-main">
        <header>
          <h1 className="cs-title">{N.title}</h1>
          <p className="lead soft">
            {N.intro}
          </p>
          <p className="feed">
            <a href={localize(lang, "/notes/feed.xml")} className="link">
              {N.feed}
            </a>
          </p>
        </header>

        {notes.length ? (
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
        ) : (
          <p className="soft notes-empty">
            {N.empty}
          </p>
        )}
      </main>
      <Footer />
    </>
  );
}
