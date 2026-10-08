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
      <main id="main" className="container-edge notes-main">
        <article>
          <header className="note-head">
            <a href={notesPath(lang)} className="mono tap cs-back">
              <Arrow size={12} back />
              {t.notes.all}
            </a>
            <time className="mono dim" dateTime={note.date} style={{ display: "block", marginTop: 32, fontSize: 12 }}>
              {formatNoteDate(lang, note.date)}
            </time>
            <h1 className="d2" style={{ marginTop: 14, maxWidth: "22ch" }}>
              {note.title}
            </h1>
            <p className="lead dim" style={{ marginTop: 18, maxWidth: "52ch" }}>
              {note.description}
            </p>
          </header>

          <div className="note-body">{children}</div>
        </article>

        <aside className="note-cta">
          <p className="d3">{t.notes.cta}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 20 }}>
            <a
              href={contactHref(home, "project")}
              className="btn btn-primary"
              {...trackAttrs("note_cta_project", { note: note.slug })}
            >
              {t.hero.cta_project}
              <Arrow />
            </a>
            <a
              href={`${home}#cv`}
              className="btn btn-ghost"
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
