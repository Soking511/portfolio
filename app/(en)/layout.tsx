import type React from "react";
import { RootShell } from "@/components/shell/root-shell";
import { layoutMetadata } from "@/lib/seo";

export const metadata = layoutMetadata("en");

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootShell lang="en">{children}</RootShell>;
}
