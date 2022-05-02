module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#171629',
        card: {
          bg: '#25203F',
          border: '#50336C',
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
