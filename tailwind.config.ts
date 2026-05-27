import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#080808",
          secondary: "#111111",
          card: "#161616",
          hover: "#1E1E1E"
        },
        accent: {
          red: "#FF0033",
          "red-dim": "#CC0026",
          "red-glow": "rgba(255,0,51,0.15)",
          blue: "#0066FF",
          "blue-glow": "rgba(0,102,255,0.15)"
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#A0A0A0",
          muted: "#555555"
        },
        border: {
          DEFAULT: "#222222",
          subtle: "#1A1A1A"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Satoshi", "Inter", "system-ui", "sans-serif"]
      },
      animation: {
        "gradient-x": "gradient-x 4s ease infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "slide-up": "slide-up 0.4s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "typing": "typing 1.4s steps(3) infinite"
      },
      keyframes: {
        "gradient-x": {
          "0%,100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" }
        },
        "pulse-glow": {
          "0%,100%": { "box-shadow": "0 0 20px rgba(255,0,51,0.3)" },
          "50%": { "box-shadow": "0 0 40px rgba(255,0,51,0.6)" }
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" }
        },
        "typing": {
          "0%": { content: "''" },
          "33%": { content: "'.'" },
          "66%": { content: "'..'" },
          "100%": { content: "'...'" }
        }
      },
      backdropBlur: {
        xs: "2px"
      }
    }
  },
  plugins: []
};

export default config;
