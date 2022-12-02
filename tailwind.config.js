/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        p: {
          green: "#7ED967",
          blue: "#2744A1",
          "white-green": "#E6E8E5",
        },
      },
    },
  },
  plugins: [],
};
