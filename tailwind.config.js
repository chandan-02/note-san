const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors:{
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      footer_bg: '#f1f1f1',
      m_purple: '#B894FF',
      m_dark_orange:'#FF9B73',
      m_lime: '#E4EE8E',
      m_blue:'#01D4FF',
      m_light_orange:'#FFC972'
    },
    extend: {
      fontFamily:{
        'poppins': ['Poppins'],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
