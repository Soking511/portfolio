import type { Config } from "tailwindcss";

// Tailwind is used for preflight and the occasional utility only; the design
// system itself lives in CSS custom properties in app/globals.css.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        "fg-dim": "var(--fg-dim)",
        rule: "var(--rule)",
        card: "var(--card)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
      },
      fontFamily: {
        sans: ["var(--sans)"],
        serif: ["var(--serif)"],
        mono: ["var(--mono)"],
      },
      maxWidth: { edge: "var(--maxw)" },
    },
  },
  plugins: [],
};

export default config;
