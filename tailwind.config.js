// tailwind.config.js
module.exports = {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        gray: {
          50: "#f5f7fa",
          51: "#f0f4f8",
          52: "#ecf2f7",
          300: "#cbd5e1",
          400: "#a0aec0",
          401: "#97a6b5",
          600: "#4a5568",
          604: "#505d6b",
          700: "#434c5e",
          900: "#1a202c",
          "900_cc": "#1a202ccc",
        },
        deep_orange: {
          50: "#ebf5ff",
          300: "#4299e1",
          400: "#3182ce",
          900: "#1c3d5a",
        },
        red: { 100: "#cfe8ff", 101: "#ecd6c8" },
        bluegray: {
          100: "#d6d6d6",
          101: "#d9d9d9",
          102: "#cfcfcf",
          600: "#406f85",
          "300_33": "#91aebb33",
        },
        orange: { A700: "#0d47a1" },
        yellow: { 50: "#f0f9ff" },
        white: { A700: "#ffffff" },
      },
      fontFamily: { manrope: 'system-ui', markoone: "Marko One" },
      boxShadow: { bs: "0px 30px  30px 0px #91aebb33" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
