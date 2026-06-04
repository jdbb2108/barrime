import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta dark + rosa — mapeada a variables CSS
        bg:       "var(--bg)",
        surface:  "var(--surface)",
        surface2: "var(--surface2)",
        border:   "var(--border)",
        border2:  "var(--border2)",
        t1:       "var(--t1)",
        t2:       "var(--t2)",
        t3:       "var(--t3)",
        pink:     "var(--pink)",
        "pink-soft": "var(--pink-soft)",
        "pink-bg":   "var(--pink-bg)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        reading: "1040px",
      },
    },
  },
  plugins: [],
};

export default config;
