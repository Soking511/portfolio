import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { FEATURED } from "@/lib/projects";
import { LANGS, languageAlternates, localize, notesPath } from "@/lib/i18n";
import { notesIn } from "@/content/notes/meta";

export const dynamic = "force-static";

/**
 * Every page in both languages, each listing its counterpart as an alternate.
 * Notes are per language, so they are listed only where they exist — and a
 * notes index only once it has a note in it.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...FEATURED.map((m) => `/work/${m.slug}/`)];
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = paths.flatMap((path) =>
    LANGS.map((lang) => ({
      url: `${SITE_URL}${localize(lang, path)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
      alternates: { languages: languageAlternates(path, SITE_URL) },
    })),
  );

  const notes: MetadataRoute.Sitemap = LANGS.flatMap((lang) => {
    const list = notesIn(lang);
    if (!list.length) return [];
    return [
      { url: `${SITE_URL}${notesPath(lang)}`, lastModified, changeFrequency: "weekly" as const, priority: 0.6 },
      ...list.map((note) => ({
        url: `${SITE_URL}${notesPath(lang, note.slug)}`,
        lastModified: new Date(`${note.date}T00:00:00Z`),
        changeFrequency: "yearly" as const,
        priority: 0.6,
      })),
    ];
  });

  return [...pages, ...notes];
}
