import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        secondary: {
          DEFAULT: colors.neutral[200],
          hover: colors.neutral[300],
          border: colors.neutral[400],
          text: colors.neutral[500],
          dark: colors.neutral[800],
          ['dark-hover']: colors.neutral[900],
        },
        dark: {
          DEFAULT: colors.zinc[800],
          button: colors.zinc[900],
          border: colors.zinc[700],
          text: colors.zinc[300],
          ['hover']: colors.zinc[700],
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
