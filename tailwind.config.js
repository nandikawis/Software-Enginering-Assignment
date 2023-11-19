/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        lightgray: '#EBEAE8', // Custom name for light gray
        lightteal: '#CEF2F2', // Custom name for light teal
        pink: '#E92A69',      // Custom name for pink
        darkgray: '#0D0D0D',  // Custom name for dark gray
      },
      backgroundColor: {
        'pink-light': '#E92A69' // And here you could add a variant with opacity
      },
      fontFamily: {
        sans: ['Fira Sans', 'sans-serif'],
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1440px',
      },
    },
  },
  plugins: [],
}

