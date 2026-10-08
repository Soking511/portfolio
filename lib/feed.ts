import { STRINGS, type Lang } from "@/components/lang/strings";
import { notesIn } from "@/content/notes/meta";
import { localize, notesPath } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RSS 2.0 for one language's notes, served at /notes/feed.xml and /ar/notes/feed.xml. */
export function notesFeed(lang: Lang): Response {
  const N = STRINGS[lang].notes;
  const items = notesIn(lang)
    .map((note) => {
      const url = `${SITE_URL}${notesPath(lang, note.slug)}`;
      return `    <item>
      <title>${esc(note.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(`${note.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(note.description)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(`${N.title} — ${lang === "ar" ? "يوسف طارق" : "Youseef Tareq"}`)}</title>
    <link>${SITE_URL}${notesPath(lang)}</link>
    <atom:link href="${SITE_URL}${localize(lang, "/notes/feed.xml")}" rel="self" type="application/rss+xml"/>
    <description>${esc(N.intro)}</description>
    <language>${lang}</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
