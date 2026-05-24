"use client";

import { useState } from "react";
import { useTheme, ACCENT_OPTIONS } from "./provider";
import { useT } from "@/components/lang/provider";

const PANEL_BUTTON_STYLE = {
  position: "fixed" as const,
  bottom: 22,
  insetInlineEnd: 22,
  zIndex: 100,
  width: 44,
  height: 44,
  borderRadius: 999,
  border: "1px solid var(--rule)",
  background: "var(--card)",
  color: "var(--fg)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: "0 4px 18px rgba(0,0,0,.12)",
};

export function TweaksPanel() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const { lang, setLang } = useT();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle tweaks panel"
        className="mono"
        style={PANEL_BUTTON_STYLE}
      >
        <span style={{ fontSize: 16 }}>{open ? "×" : "✱"}</span>
      </button>

      {open && (
        <aside
          className="mono"
          style={{
            position: "fixed",
            bottom: 78,
            insetInlineEnd: 22,
            zIndex: 99,
            width: 280,
            maxWidth: "calc(100vw - 44px)",
            padding: "18px 18px 16px",
            background: "var(--card)",
            color: "var(--fg)",
            border: "1px solid var(--rule)",
            borderRadius: 14,
            boxShadow: "0 18px 50px rgba(0,0,0,.18)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            fontSize: 11,
            letterSpacing: ".06em",
          }}
        >
          <Section label="Language">
            <Segmented
              value={lang}
              options={[
                ["en", "EN"],
                ["ar", "AR"],
              ]}
              onChange={(v) => setLang(v as "en" | "ar")}
            />
          </Section>

          <Section label="Style">
            <Segmented
              value={theme.style}
              options={[
                ["studio", "Studio"],
                ["editorial", "Editorial"],
              ]}
              onChange={(v) => theme.setStyle(v as "studio" | "editorial")}
            />
          </Section>

          <Section label="Theme">
            <Segmented
              value={theme.theme}
              options={[
                ["light", "Light"],
                ["dark", "Dark"],
              ]}
              onChange={(v) => theme.setTheme(v as "light" | "dark")}
            />
          </Section>

          <Section label="Accent">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {ACCENT_OPTIONS[theme.style].map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-label={`Accent ${c}`}
                  onClick={() => theme.setAccent(c)}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 999,
                    background: c,
                    border:
                      theme.activeAccent.toLowerCase() === c.toLowerCase()
                        ? "2px solid var(--fg)"
                        : "1px solid var(--rule)",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </Section>
        </aside>
      )}
    </>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span
        style={{
          fontSize: 10,
          letterSpacing: ".14em",
          textTransform: "uppercase",
          color: "var(--fg-dim)",
        }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

function Segmented({
  value,
  options,
  onChange,
}: {
  value: string;
  options: Array<[string, string]>;
  onChange: (v: string) => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${options.length}, 1fr)`,
        gap: 4,
        padding: 4,
        background: "var(--bg)",
        border: "1px solid var(--rule)",
        borderRadius: 999,
      }}
    >
      {options.map(([k, label]) => (
        <button
          key={k}
          type="button"
          onClick={() => onChange(k)}
          style={{
            padding: "6px 8px",
            borderRadius: 999,
            background: value === k ? "var(--fg)" : "transparent",
            color: value === k ? "var(--bg)" : "var(--fg)",
            fontSize: 11,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "background .15s, color .15s",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
