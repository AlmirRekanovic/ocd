import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // OCD Fighters brand palette: royal/azure blue + chrome silver on black,
        // matching the club logo.
        brand: {
          DEFAULT: "#2e72e6",
          dark: "#1b54bf",
          light: "#6aa8ff",
        },
        steel: {
          light: "#d7dce2",
          DEFAULT: "#aab2bd",
          dark: "#6b7280",
        },
        ink: {
          900: "#000000",
          800: "#0c0e12",
          700: "#171a20",
          600: "#232830",
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
