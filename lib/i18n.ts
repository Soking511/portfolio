import type { Lang } from "@/components/lang/strings";

/**
 * Every page exists twice: English at its plain path, Arabic under /ar.
 * Paths here are language-neutral ("/", "/work/eg-pricey/") and always end
 * in a slash, matching `trailingSlash: true` in next.config.mjs.
 */
export const LANGS: readonly Lang[] = ["en", "ar"];

export function localize(lang: Lang, path: string): string {
  return lang === "ar" ? `/ar${path}` : path;
}

/** The language-neutral path of a URL pathname, e.g. "/ar/work/x" → "/work/x/". */
export function neutralPath(pathname: string): string {
  let p = pathname.replace(/^\/ar(?=\/|$)/, "") || "/";
  if (!p.endsWith("/")) p += "/";
  return p;
}

export function homePath(lang: Lang): string {
  return localize(lang, "/");
}

export function workPath(lang: Lang, slug: string): string {
  return localize(lang, `/work/${slug}/`);
}

export function notesPath(lang: Lang, slug?: string): string {
  return localize(lang, slug ? `/notes/${slug}/` : "/notes/");
}

/** hreflang map for a language-neutral path, for metadata and the sitemap. */
export function languageAlternates(path: string, origin = "") {
  return {
    en: `${origin}${localize("en", path)}`,
    ar: `${origin}${localize("ar", path)}`,
    "x-default": `${origin}${localize("en", path)}`,
  };
}
