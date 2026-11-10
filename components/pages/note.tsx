"use client";

import type { ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Arrow } from "@/components/arrow";
import { useT } from "@/components/lang/provider";
import { contactHref } from "@/components/contact-intent";
import { formatNoteDate, type NoteMeta } from "@/content/notes/meta";
import { homePath, notesPath } from "@/lib/i18n";
import { trackAttrs } from "@/lib/analytics";

/**
 * One note. The body arrives as children — MDX rendered on the server at
 * build time — so the browser only receives its HTML, never the MDX.
 */
export function NotePage({ note, children }: { note: NoteMeta; children: ReactNode }) {
  const { t, lang } = useT();
  const home = homePath(lang);

  return (
    <>
      <a className="skip-link" href="#main">
        {t.misc.skip}
      </a>
      <Header />
      <main id="main" className="container notes-main">
        <article>
          <header className="note-head">
            <a href={notesPath(lang)} className="back-link">
              <Arrow size={14} back />
              {t.notes.all}
            </a>
            <time dateTime={note.date}>{formatNoteDate(lang, note.date)}</time>
            <h1 className="h2">{note.title}</h1>
            <p className="lead soft">{note.description}</p>
          </header>

          <div className="note-body">{children}</div>
        </article>

        <aside className="note-cta">
          <p className="h3">{t.notes.cta}</p>
          <div className="actions">
            <a
              href={contactHref(home, "project")}
              className="btn btn--primary"
              {...trackAttrs("note_cta_project", { note: note.slug })}
            >
              {t.hero.cta_project}
            </a>
            <a
              href={`${home}#cv`}
              className="btn btn--secondary"
              {...trackAttrs("note_cta_hiring", { note: note.slug })}
            >
              {t.hero.cta_hiring}
            </a>
          </div>
        </aside>
      </main>
      <Footer />
    </>
  );
}
