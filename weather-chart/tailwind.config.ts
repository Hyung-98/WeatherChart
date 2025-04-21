import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F5F5FF",
          100: "#EBEBFF",
          200: "#D6D6FF",
          300: "#B8B8FF",
          400: "#9999FF",
          500: "#7A7AFF",
          600: "#5C5CFF",
          700: "#3D3DFF",
          800: "#1F1FFF",
          900: "#0000FF",
        },
        secondary: {
          50: "#FFF5F5",
          100: "#FFE6E6",
          200: "#FFC7C7",
          300: "#FFA8A8",
          400: "#FF8989",
          500: "#FF6B6B",
          600: "#FF4C4C",
          700: "#FF2D2D",
          800: "#FF0F0F",
          900: "#F00",
        },
        neutral: {
          50: "#F8F9FA",
          100: "#F1F3F5",
          200: "#E9ECEF",
          300: "#DEE2E6",
          400: "#CED4DA",
          500: "#ADB5BD",
          600: "#868E96",
          700: "#495057",
          800: "#343A40",
          900: "#212529",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 15px rgba(0, 0, 0, 0.05)",
        medium: "0 4px 20px rgba(0, 0, 0, 0.1)",
        hard: "0 8px 30px rgba(0, 0, 0, 0.15)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
