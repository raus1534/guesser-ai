/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#4ade80",
          DEFAULT: "#22c55e",
          dark: "#16a34a",
        },
        secondary: {
          light: "#f0fdf4",
          DEFAULT: "#dcfce7",
          dark: "#bbf7d0",
        },
      },
      animation: {
        "leaf-sway": "sway 6s ease-in-out infinite",
      },
      keyframes: {
        sway: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
    },
  },
  plugins: [],
};
