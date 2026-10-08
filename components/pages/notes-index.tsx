"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useT } from "@/components/lang/provider";
import { useReveal } from "@/components/theme/use-reveal";
import { formatNoteDate, notesIn } from "@/content/notes/meta";
import { localize, notesPath } from "@/lib/i18n";

/** Every note in this language, newest first. */
export function NotesIndexPage() {
  const { t, lang } = useT();
  useReveal();
  const N = t.notes;
  const notes = notesIn(lang);

  return (
    <>
      <a className="skip-link" href="#main">
        {t.misc.skip}
      </a>
      <Header />
      <main id="main" className="container-edge notes-main">
        <header>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <span className="eyebrow">{N.title}</span>
            <span className="rule" style={{ flex: 1 }} />
            <a href={localize(lang, "/notes/feed.xml")} className="mono tap dim" style={{ fontSize: 12 }}>
              {N.feed}
            </a>
          </div>
          <h1 className="d1" style={{ maxWidth: "14ch" }}>
            {N.headline_pre}
            <span className="em">{N.headline_em}</span>
            {N.headline_post}
          </h1>
          <p className="lead dim" style={{ marginTop: 20, maxWidth: "48ch" }}>
            {N.intro}
          </p>
        </header>

        {notes.length ? (
          <ol className="notes-list">
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
        ) : (
          <p className="body dim" style={{ marginTop: 56 }}>
            {N.empty}
          </p>
        )}
      </main>
      <Footer />
    </>
  );
}
