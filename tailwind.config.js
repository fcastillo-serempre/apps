const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./apps/wiki/**/*.tsx', './libs/**/*.{tsx,ts,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
