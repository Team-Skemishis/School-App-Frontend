/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "theme-color": "#254BAB"
      },
      fontFamily: {
        dancingScript: ["Dancing Script", "cursive"],
        righteousStatic: ["Righteous", "serif"],
        arima: ["Arima", "serif"],
        montserrat: ["Montserrat", "serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class"
}

