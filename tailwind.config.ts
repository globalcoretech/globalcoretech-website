import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // 👈 IMPORTANT (auto dark band)
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#14b8a6", // teal-500
          dark: "#0d9488",
        },
      },
      backdropBlur: {
        glass: "12px",
      },
      backgroundColor: {
        glass: "rgba(255,255,255,0.65)",
      },
      boxShadow: {
        glass: "0 10px 30px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
