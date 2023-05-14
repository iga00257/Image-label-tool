/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E6E6E6',
        primaryText: '#519903',
        secondaryText: '#333333'
      }
    }
  },
  plugins: []
}
