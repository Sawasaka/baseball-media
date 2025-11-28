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
          bg: "#050508",
          "bg-secondary": "#0A0A12",
          "bg-card": "#12121A",
        },
      },
      fontFamily: {
        sans: ['var(--font-zen-kaku)', 'sans-serif'],
        mono: ['var(--font-orbitron)', 'monospace'],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" }
        },
      },
    },
  },
  plugins: [],
};
export default config;
