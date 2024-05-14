/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: "#7BB7E3",
      },
      textDecoration: {
        "underline-blue": "underline blue-500",
      },
    },
    fontFamily: {
      Platypi: ["Platypi", "serif"],
    },
  },

  plugins: [],
};


