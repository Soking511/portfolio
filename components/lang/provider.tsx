"use client";

import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { STRINGS, type Lang, type Strings } from "./strings";
import { homePath, localize, neutralPath } from "@/lib/i18n";

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
};

const LangContext = createContext<LangContextValue>({
  lang: "en",
  t: STRINGS.en,
  dir: "ltr",
  altLang: "ar",
  altHref: "/ar/",
  homeAnchor: (hash) => hash,
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
    return {
      lang,
      t: STRINGS[lang],
      dir: STRINGS[lang].dir,
      altLang,
      altHref: localize(altLang, path),
      homeAnchor: (hash) => (path === "/" ? hash : `${home}${hash}`),
    };
  }, [lang, pathname]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useT() {
  return useContext(LangContext);
}
