/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
theme: {
    extend: {
      colors: {
        primarybg:"#F4F9FC",
        redaccent : "#f67796",
        greenaccent : "#A1E4B3",
        greenbg:"#F7F8F9",
        yellowbg:"#fdfbf9",
        yellowaccent:"#FBB554",
        redbg:"#FFF7F7",
        textcolor:"#302861"

      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}