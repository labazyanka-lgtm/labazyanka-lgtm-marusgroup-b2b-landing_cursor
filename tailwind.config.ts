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
        "2xl": "1240px",
      },
    },
    extend: {
      colors: {
        accent: {
          DEFAULT: "#1F4E5F",
          hover: "#173D4B",
          50: "#EAF2F4",
          100: "#DDEFF3",
          200: "#BCD9DF",
          300: "#8FB7C0",
          400: "#5E8E99",
          500: "#2F6E80",
          600: "#1F4E5F",
          700: "#173D4B",
          800: "#112F39",
          900: "#0B2129",
          950: "#06151A",
        },
        ink: {
          DEFAULT: "#15171A",
          muted: "#5D6673",
          soft: "#7C8593",
        },
        line: {
          DEFAULT: "#DDE2E8",
          soft: "#E8ECF1",
        },
        metal: "#AAB3BC",
        glass: "#DDEFF3",
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#F7F8FA",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.05)",
        cta: "0 10px 28px -12px rgba(31, 78, 95, 0.55)",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(1200px 600px at 85% -10%, rgba(31, 78, 95, 0.10), transparent 60%), radial-gradient(900px 500px at -10% 10%, rgba(221, 239, 243, 0.55), transparent 60%)",
        "grid-soft":
          "linear-gradient(to right, rgba(15,23,26,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,26,0.05) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
