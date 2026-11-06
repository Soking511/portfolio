import type React from "react";
import { Alexandria, IBM_Plex_Sans_Arabic } from "next/font/google";
import { RootShell } from "@/components/shell/root-shell";
import { layoutMetadata } from "@/lib/seo";

// Self-hosted at build time, so Arabic pages never reach out to Google Fonts
// at runtime. Plex Sans Arabic is the reading face (its Latin is Plex Sans,
// so product names inside Arabic sentences match the English site);
// Alexandria's Arabic subset is preloaded here because on these pages the
// Arabic name is the first thing painted.
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600"],
  variable: "--font-plex-arabic",
  display: "swap",
});

const alexandriaArabic = Alexandria({
  subsets: ["arabic"],
  weight: "variable",
  variable: "--font-alexandria-arabic",
  display: "swap",
});

export const metadata = layoutMetadata("ar");

export default function ArabicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <RootShell lang="ar" fontClassName={`${plexArabic.variable} ${alexandriaArabic.variable}`}>
      {children}
    </RootShell>
  );
}
