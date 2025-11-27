import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          cyan: "#00f0ff",
          magenta: "#ff00ff",
          yellow: "#ffff00",
          bg: "#0a0a0f",
          "bg-sub": "#1a1a2e",
          text: "#e0e0e0",
        },
      },
      backgroundImage: {
        "cyber-grid": "linear-gradient(to right, #1a1a2e 1px, transparent 1px), linear-gradient(to bottom, #1a1a2e 1px, transparent 1px)",
      },
      fontFamily: {
        sans: ['var(--font-zen-kaku)', 'sans-serif'],
        mono: ['var(--font-orbitron)', 'monospace'],
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glitch": "glitch 1s linear infinite",
      },
      keyframes: {
        glitch: {
          "2%, 64%": { transform: "translate(2px,0) skew(0deg)" },
          "4%, 60%": { transform: "translate(-2px,0) skew(0deg)" },
          "62%": { transform: "translate(0,0) skew(5deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

