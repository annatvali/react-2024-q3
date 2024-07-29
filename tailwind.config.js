/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#f8f8f8',
        black: '#121001',
        darkBlue: '#0a58ca',
        lightBlue: '#add8e6',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
