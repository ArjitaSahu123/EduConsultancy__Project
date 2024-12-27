// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
      },
      colors: {
        dark: '#162D3A',  
        grey: '#F3F9FA',  
        white: '#F7FBFF',     
        lightblue:'#F7FBFF',
        orange : '#FF9500',
        // ===== FOR LABELS ====

        purple : '#EBEBFF',
        yellow : '#FFF2E5',
        green : '#E1F7E3',
        red : '#FFF0F0'
        // You can also add other color names here
      }
    },
  },
  plugins: [],
}
