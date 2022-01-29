const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
    },
  },
  variants: {
    margin: ['hover', 'first', 'last', 'before', 'after'],
    padding: ['hover', 'first', 'last'],
    display: ['before', 'after'],
    textColor: ['before', 'after', 'disabled'],
    fontSize: ['before', 'after'],
    backgroundColor: ['before', 'after'],
    cursor: ['disabled']
  },
  plugins: [],
}