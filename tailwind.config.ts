import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
        serif: "var(--serif)",
        sans: "var(--sans)",
        mono: "var(--mono)",
      },
      maxWidth: {
        edge: "var(--maxw)",
      },
      letterSpacing: {
        display: "var(--display-tracking)",
      },
    },
  },
  plugins: [],
};

export default config;
