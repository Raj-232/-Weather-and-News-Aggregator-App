/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f4f7fb',
          100: '#e6ecf5',
          200: '#c5d3e6',
          300: '#a2b8d6',
          400: '#7a97be',
          500: '#3E5F90',
          600: '#36547f',
          700: '#2d466a',
          800: '#243755',
          900: '#3E5F90',
        },
      }
    },
  },
  plugins: [],
}