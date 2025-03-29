/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#89be38',
        text: '#374151',
        hover: '#6fac14'
      },
      container:{
        padding: '4rem'
      }
    },
  },
  plugins: [],
}

