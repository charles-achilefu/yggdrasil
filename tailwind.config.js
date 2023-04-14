/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        white60: 'rgb(255, 255, 255, 0.6)',
        white90: 'rgb(255, 255, 255, 0.9)',
        gray1: '#191B1F',
        gray2: '#101216',
        softgreen: '#BFE3B4',
      },
      background: '#fff',
      borderRadius: {
        '20': '20px',
      },
    },
  },
  plugins: [],
}
