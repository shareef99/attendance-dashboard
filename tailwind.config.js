/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        p: {
          "blue-dark": "#2a4d69",
          blue: "#4c86b4",
          "blue-light": "#adcbe3",
          gray: "#e7eef6",
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
