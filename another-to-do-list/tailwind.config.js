/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        main: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: {
          300: "#FDF7E4",
          400: "#FAEED1",
          500: "#DED0B6",
          600: "#BBAB8C",
        },
      },
    },
  },
  plugins: [],
};
