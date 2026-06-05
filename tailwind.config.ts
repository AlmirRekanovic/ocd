import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // OCD Fighters brand palette: dark, aggressive, with a red accent.
        brand: {
          DEFAULT: "#e11d2a",
          dark: "#b30f1b",
          light: "#ff3b47",
        },
        ink: {
          900: "#0a0a0b",
          800: "#141416",
          700: "#1d1d20",
          600: "#2a2a2e",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
