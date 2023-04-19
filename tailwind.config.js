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
        gray3: '#010510',
        gray4: '#1E1F25',
        borderUnselected: '#2A2D36',
        borderSelected: '#4D5058',
        softgreen: '#BFE3B4',
        smoothgreen: '#5EE8CE',
        smoothred: '#FF6961',
      },
      background: '#fff',
      borderRadius: {
        20: '20px',
      },
      screens: {
        xl: { max: '1200px' },
        lg: { min: '767px', max: '1024px' },
        md: { min: '479px', max: '768px' },
        sm: { max: '480px' },
      },
      fontFamily: {
        AeonikPro: ['AeonikPro', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
