/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "obs-dark": "#004242", // Deep Teal
        "obs-mint": "#b4f481", // Mint Green
        "obs-yellow": "#fff3bf", // Pale Yellow
        "obs-border": "#0e6161", // Button border teal
        "obs-gray": "#a3b1c6",
        "signup-green": "#00c985", // The vibrant green from the button
        "signup-bg": "#f4f7f9", // The light gray background
      },
      animation: {
        "infinite-scroll": "infinite-scroll 60s linear infinite",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
