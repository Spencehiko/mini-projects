module.exports = {
  content: ["./src/**/*.{html,js}"],
  variants: {
    margin: ['hover', 'first', 'last'],
    padding: ['hover', 'first', 'last'],
    border: ['hover', 'first', 'last'],
    background: ['responsive', 'hover', 'first', 'last'],
    bg: ['responsive', 'hover', 'first', 'last'],
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
