import type React from "react";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { RootShell } from "@/components/shell/root-shell";
import { layoutMetadata } from "@/lib/seo";

// Self-hosted at build time, so Arabic pages no longer reach out to Google
// Fonts at runtime or swap faces after first paint. Arabic subset only —
// Latin words fall through to Geist, as on the English site.
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-arabic",
  display: "swap",
});

export const metadata = layoutMetadata("ar");

export default function ArabicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <RootShell lang="ar" fontClassName={plexArabic.variable}>
      {children}
    </RootShell>
  );
}
