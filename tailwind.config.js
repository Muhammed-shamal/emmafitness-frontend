/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
 
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2D2D2D",
        lightPrimary: "#e2e2e2",
        secondary: "#FF0000",
        darkSecondary: "#ca0303"
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '3rem',
        },
      },
    },
  },
  plugins: [ ],
}

