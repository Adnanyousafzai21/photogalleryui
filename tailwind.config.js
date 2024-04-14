

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        '101': '1.01',
        '103': '1.03',
      },
      colors: {
        custombg: '#3AB4FF',
        customtext: '#93C5FD',
        customtextbold: '#3AB4FF',
      },
    },
  },
  plugins: [],
}

