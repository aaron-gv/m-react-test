/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bluetop-start': '#0095FE',
        'bluetop-end': '#006AFE'
      },
    },
  },
  plugins: [],
}

