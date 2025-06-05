/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,tsx,ts}"],
  theme: {
    extend: {
      transformStyle: {
        "preserve-3d": "preserve-3d",
      },
      rotate: {
        "y-180": "rotateY(180deg)",
      },
      backfaceVisibility: {
        hidden: "hidden",
      },
    },
  },
  plugins: [],
};
