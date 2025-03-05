/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        stiletto: {
          50: "#fdf3f4",
          100: "#fce4e5",
          200: "#faced0",
          300: "#f5acb0",
          400: "#ed7c82",
          500: "#e1525a",
          600: "#cd353d",
          700: "#ac2930",
          800: "#9a282e",
          900: "#772529",
          950: "#400f12",
        }
      }
    }
  },
  plugins: [],
}
