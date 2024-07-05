import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        food: "url('assets/food_placeholder.jpg')",
      },
      colors: {
        "primary-color": "#0C4DA2",
        "secundary-color": "#00AEEF",
        "secundary-color-op1": "rgba(0, 174, 239, 0.1)",
        "color-op": "rgba(0, 0, 0, 0.8)",
        "error-color": "#842F2F",
        subtitle: "#a3a3a3",
        success: "#68C06C",
        "card-bg": "#F4F4F4",
        home: "#FBF6F6",
        error: "#842F2F",
        wpp: "#128c7e",
      },
      fontSize: {
        "3.5xl": "2rem",
        xxs: "0.625rem",
      },
      height: {
        mob: "29rem",
        desk: "23rem",
        tablet: "30.5rem",
      },
      maxHeight: {
        mob: "26rem",
        desk: "23rem",
        tablet: "33rem",
        "desk-lg": "27.5rem",
        "desk-2xl": "29rem",
      },
      minHeight: {
        mob: "26rem",
        desk: "23rem",
        tablet: "33rem",
        "desk-lg": "27.5rem",
        "desk-2xl": "29rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
