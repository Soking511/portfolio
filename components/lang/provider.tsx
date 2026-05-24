"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { STRINGS, type Lang, type Strings } from "./strings";

type LangContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Strings;
  dir: "ltr" | "rtl";
};

const LangContext = createContext<LangContextValue>({
  lang: "en",
  setLang: () => {},
  t: STRINGS.en,
  dir: "ltr",
});

const STORAGE_KEY = "portfolio:lang";
const AR_FONTS_LINK_ID = "ar-fonts";
const AR_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600&display=swap";

function safeReadStoredLang(): Lang | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "ar" || v === "en" ? v : null;
  } catch {
    return null;
  }
}

function ensureArabicFontsLoaded() {
  if (typeof document === "undefined") return;
  if (document.getElementById(AR_FONTS_LINK_ID)) return;
  const link = document.createElement("link");
  link.id = AR_FONTS_LINK_ID;
  link.rel = "stylesheet";
  link.href = AR_FONTS_HREF;
  document.head.appendChild(link);
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = safeReadStoredLang();
    if (stored && stored !== lang) {
      setLangState(stored);
    }
    // Sync html attributes in case the pre-hydration script didn't run.
    const root = document.documentElement;
    const dir = STRINGS[stored ?? lang].dir;
    root.setAttribute("lang", stored ?? lang);
    root.setAttribute("dir", dir);
    if ((stored ?? lang) === "ar") ensureArabicFontsLoaded();
    // intentionally only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode: ignore */
    }
    const root = document.documentElement;
    root.setAttribute("lang", next);
    root.setAttribute("dir", STRINGS[next].dir);
    if (next === "ar") ensureArabicFontsLoaded();
  };

  const value = useMemo<LangContextValue>(
    () => ({ lang, setLang, t: STRINGS[lang], dir: STRINGS[lang].dir }),
    [lang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useT() {
  return useContext(LangContext);
}
