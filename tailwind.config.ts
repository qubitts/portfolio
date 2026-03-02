import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#020c1b",
          800: "#0a192f",
          700: "#112240",
          600: "#1d3461",
        },
        slate: {
          light: "#e2e8ff",
          DEFAULT: "#a8b2d1",
          dark: "#495670",
        },
        mint: "#5eead4",
        gold: "#fbbf24",
        coral: "#f87171",
      },
      fontFamily: {
        mono: ["var(--font-jetbrains)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
