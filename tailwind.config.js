/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        'LineBuddyBlue': '#5CE1E6'
      },
      fontFamily: {
        'sans': ['ui-sans-serif', 'system-ui',],
        'serif': ['ui-serif', 'Georgia'],
        'mono': ['ui-monospace', 'SFMono-Regular'],
        'display': ['Oswald',],
        'body': ['"Open Sans"',],
      },
    },
  },
  plugins: [],
}
