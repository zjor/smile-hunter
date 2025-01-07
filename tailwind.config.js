/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '425px',
    },
    extend: {
      fontFamily: {
        baloo: ['"Baloo 2"'], // Add your font here
      },
    },
  },
  plugins: [],
}

