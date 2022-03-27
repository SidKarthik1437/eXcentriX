module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0f172a',
        card: {
          bg: '#1e293b',
          border: '#94a3b8',
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
