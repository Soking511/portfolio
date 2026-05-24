"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type Style = "studio" | "editorial";
export type Theme = "light" | "dark";

export type TweakState = {
  style: Style;
  theme: Theme;
  accentStudio: string;
  accentEditorial: string;
};

export const DEFAULT_TWEAKS: TweakState = {
  style: "studio",
  theme: "light",
  accentStudio: "#2D5BFF",
  accentEditorial: "#7C5CFF",
};

export const ACCENT_OPTIONS: Record<Style, string[]> = {
  studio: ["#2D5BFF", "#0F766E", "#B45309", "#7C2D12", "#1E293B", "#0A0A0A"],
  editorial: ["#7C5CFF", "#FF5B2A", "#00E08A", "#FFD400", "#3D8BFF", "#F2F2F2"],
};

export const STORAGE_KEY = "portfolio:tweaks";

type ThemeContextValue = TweakState & {
  setStyle: (s: Style) => void;
  setTheme: (t: Theme) => void;
  setAccent: (c: string) => void;
  activeAccent: string;
};

const ThemeContext = createContext<ThemeContextValue>({
  ...DEFAULT_TWEAKS,
  setStyle: () => {},
  setTheme: () => {},
  setAccent: () => {},
  activeAccent: DEFAULT_TWEAKS.accentStudio,
});

function readStored(): Partial<TweakState> {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (!v) return {};
    const parsed = JSON.parse(v);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeStored(s: TweakState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* private mode: ignore */
  }
}

function applyToDom(s: TweakState) {
  const root = document.documentElement;
  root.setAttribute("data-style", s.style);
  root.setAttribute("data-theme", s.theme);
  const accent = s.style === "studio" ? s.accentStudio : s.accentEditorial;
  root.style.setProperty("--accent", accent);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TweakState>(DEFAULT_TWEAKS);

  useEffect(() => {
    const stored = readStored();
    const next: TweakState = { ...DEFAULT_TWEAKS, ...stored };
    setState(next);
    applyToDom(next);
  }, []);

  const update = (patch: Partial<TweakState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      writeStored(next);
      applyToDom(next);
      return next;
    });
  };

  const value = useMemo<ThemeContextValue>(() => {
    const activeAccent =
      state.style === "studio" ? state.accentStudio : state.accentEditorial;
    return {
      ...state,
      activeAccent,
      setStyle: (s) => update({ style: s }),
      setTheme: (t) => update({ theme: t }),
      setAccent: (c) =>
        update(
          state.style === "studio" ? { accentStudio: c } : { accentEditorial: c },
        ),
    };
  }, [state]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
