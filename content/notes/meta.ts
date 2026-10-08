import type { Lang } from "@/components/lang/strings";

export type NoteMeta = {
  slug: string;
  lang: Lang;
  title: string;
  /** One or two sentences: the index summary and the meta description. */
  description: string;
  /** Publication date, YYYY-MM-DD. */
  date: string;
  /** Slug of the same note in the other language, when there is one. */
  translation?: string;
};

/**
 * Published notes, newest first. To publish: write the body as
 * content/notes/<lang>/<slug>.mdx, add it to bodies.ts, then add its entry
 * here.
 * Outlines in _drafts/ are never built.
 *
 * While a language has no notes, nothing links to its notes pages: the nav
 * item, the home strip and the sitemap entries all appear with the first one.
 */
export const NOTES: NoteMeta[] = [];

export function notesIn(lang: Lang): NoteMeta[] {
  return NOTES.filter((n) => n.lang === lang);
}

export function findNote(lang: Lang, slug: string): NoteMeta {
  const note = NOTES.find((n) => n.lang === lang && n.slug === slug);
  if (!note) throw new Error(`Unknown note: ${lang}/${slug}`);
  return note;
}

/** "2026-10-08" → "8 October 2026" / "٨ أكتوبر ٢٠٢٦". UTC, so server and browser agree. */
export function formatNoteDate(lang: Lang, date: string): string {
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-GB", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
