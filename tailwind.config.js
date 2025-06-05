/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      quicksand: ["Quicksand", "sans-serif"],
    },

    extend: {
      colors: {},
      screens: {
        xs: "300px",
        sm: "641px",
        lg: "1025px",
        tablet: "641px",
        desktop: "1025px",
      },
    },
  },
};
