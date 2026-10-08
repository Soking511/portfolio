import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { FEATURED } from "@/lib/projects";
import { LANGS, languageAlternates, localize } from "@/lib/i18n";

export const dynamic = "force-static";

/** Every page in both languages, each listing its counterpart as an alternate. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...FEATURED.map((m) => `/work/${m.slug}/`)];
  const lastModified = new Date();

  return paths.flatMap((path) =>
    LANGS.map((lang) => ({
      url: `${SITE_URL}${localize(lang, path)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
      alternates: { languages: languageAlternates(path, SITE_URL) },
    })),
  );
}
