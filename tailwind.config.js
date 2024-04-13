

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custombg: '#3AB4FF',
        customtext: '#93C5FD',
        customtextbold: '#3AB4FF',
      },
    },
  },
  plugins: [],
}

