import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(217, 33%, 17%)",
        input: "hsl(217, 33%, 17%)",
        ring: "hsl(212, 95%, 68%)",
        background: "hsl(222, 47%, 6%)",
        foreground: "hsl(210, 40%, 98%)",
        card: {
          DEFAULT: "hsl(222, 47%, 9%)",
          foreground: "hsl(210, 40%, 98%)",
        },
        primary: {
          DEFAULT: "hsl(212, 95%, 68%)",
          foreground: "hsl(222, 47%, 11%)",
        },
        secondary: {
          DEFAULT: "hsl(217, 32%, 17%)",
          foreground: "hsl(210, 40%, 98%)",
        },
        muted: {
          DEFAULT: "hsl(217, 33%, 15%)",
          foreground: "hsl(215, 20%, 65%)",
        },
        accent: {
          DEFAULT: "hsl(142, 71%, 45%)",
          foreground: "hsl(222, 47%, 11%)",
        },
        amber: {
          glow: "rgba(245, 158, 11, 0.15)"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        'glow-blue': '0 0 25px -5px rgba(59, 130, 246, 0.25)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
        'card-hover': '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 15px rgba(59, 130, 246, 0.1)',
      }
    },
  },
  plugins: [],
};
export default config;
