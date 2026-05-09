import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#dae6ff",
          200: "#bdd2ff",
          300: "#8fb3ff",
          400: "#5b8aff",
          500: "#3563ff",
          600: "#1f43f5",
          700: "#1a33d6",
          800: "#1a2ead",
          900: "#1c2d87",
          950: "#141c52",
        },
        ink: {
          DEFAULT: "#0b1220",
          muted: "#475569",
          soft: "#64748b",
        },
        surface: {
          DEFAULT: "#ffffff",
          subtle: "#f8fafc",
          accent: "#eef2ff",
        },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Inter",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.06)",
        cta: "0 10px 30px -10px rgba(31, 67, 245, 0.55)",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(1200px 600px at 80% -10%, rgba(53, 99, 255, 0.18), transparent 60%), radial-gradient(900px 500px at -10% 10%, rgba(53, 99, 255, 0.12), transparent 60%)",
        "grid-soft":
          "linear-gradient(to right, rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
