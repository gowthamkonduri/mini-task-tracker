/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'nhs-blue': '#005EB8',
        'nhs-blue-dark': '#002f5c',
      },
    },
  },
  plugins: [],
}
