"use client";

import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { STRINGS, type Lang, type Strings } from "./strings";
import { homePath, localize, neutralPath, notesPath } from "@/lib/i18n";
import { NOTES, notesIn } from "@/content/notes/meta";

type LangContextValue = {
  lang: Lang;
  t: Strings;
  dir: "ltr" | "rtl";
  /** The other language, and the same page in it. */
  altLang: Lang;
  altHref: string;
  /**
   * A link to a section of the home page: a bare "#work" when already on it
   * (so it scrolls instead of reloading), "/ar/#work" from anywhere else.
   */
  homeAnchor: (hash: string) => string;
  /** [label, href] for the main nav, with Notes once this language has any. */
  nav: Array<[string, string]>;
};

const LangContext = createContext<LangContextValue>({
  lang: "en",
  t: STRINGS.en,
  dir: "ltr",
  altLang: "ar",
  altHref: "/ar/",
  homeAnchor: (hash) => hash,
  nav: [],
});

/**
 * The language is decided by the URL — "/" is English, "/ar/" is Arabic —
 * and handed down by each root layout. Switching language is a link to the
 * matching page, so both versions are real, crawlable documents.
 */
export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const pathname = usePathname() ?? "/";

  const value = useMemo<LangContextValue>(() => {
    const altLang: Lang = lang === "en" ? "ar" : "en";
    const path = neutralPath(pathname);
    const home = homePath(lang);
    const t = STRINGS[lang];
    const homeAnchor = (hash: string) => (path === "/" ? hash : `${home}${hash}`);
    const nav: Array<[string, string]> = t.nav.items.map(([label, hash]) => [label, homeAnchor(hash)]);
    if (notesIn(lang).length) nav.push([t.notes.nav, notesPath(lang)]);
    return {
      lang,
      t,
      dir: t.dir,
      altLang,
      altHref: alternatePath(lang, altLang, path),
      homeAnchor,
      nav,
    };
  }, [lang, pathname]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

/**
 * The same page in the other language. Every page has a twin except notes,
 * which are written per language: a note links to its translation when it
 * has one, else to the other language's notes, else to its home page.
 */
function alternatePath(lang: Lang, altLang: Lang, path: string): string {
  const note = path.match(/^\/notes\/([^/]+)\/$/);
  if (note) {
    const translation = NOTES.find((n) => n.lang === lang && n.slug === note[1])?.translation;
    if (translation) return notesPath(altLang, translation);
  }
  if (path.startsWith("/notes/")) {
    return notesIn(altLang).length ? notesPath(altLang) : homePath(altLang);
  }
  return localize(altLang, path);
}

export function useT() {
  return useContext(LangContext);
}
