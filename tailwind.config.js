/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        emilysCandy: ['"Emilys Candy"', 'cursive'],  // Custom font Emily's Candy
        alfaSlabOne: ['"Alfa Slab One"', 'serif'],   // Custom font Alfa Slab One
      },
      colors: {
        primary: '#9C634F',       // Primary color
        secondary: '#EDD1B5',     // Secondary color
        third: '#FEF5EB',   
        fourth: '#BFBDBD',
      },
    },
  },
  plugins: [require("daisyui")],
}
