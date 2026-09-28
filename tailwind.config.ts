import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
    "./public/**/*.{html,svg}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Instrument Serif", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        bg: "#080808",
        "bg-2": "#0f0f0f",
        "bg-3": "#141414",
        surface: "#1a1a1a",
        border: "#222222",
        "border-2": "#2e2e2e",
        fg: "#f0ede8",
        "fg-2": "#a8a49f",
        "fg-3": "#5a5752",
        accent: "#8b5cf6",
      },
      keyframes: {
        ticker: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scrollLine: {
          "0%":      { transform: "scaleY(0)", transformOrigin: "top" },
          "50%":     { transform: "scaleY(1)", transformOrigin: "top" },
          "50.001%": { transformOrigin: "bottom" },
          "100%":    { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
      },
      animation: {
        ticker: "ticker 30s linear infinite",
        scrollLine: "scrollLine 2s ease-in-out infinite",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
