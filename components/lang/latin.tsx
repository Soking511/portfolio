import type { CSSProperties, ReactNode } from "react";

const STYLE: CSSProperties = { direction: "ltr", unicodeBidi: "isolate" };

export function Latin({
  children,
  as: As = "span",
  className,
}: {
  children: ReactNode;
  as?: "span" | "div" | "a";
  className?: string;
}) {
  return (
    <As lang="en" dir="ltr" className={className} style={STYLE}>
      {children}
    </As>
  );
}
