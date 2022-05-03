module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#171629',
        light: '#412659',
        bright: '#b96bf8',
        card: {
          bg: '#25203F',
          border: '#50336C',
        },
      },
    },
    screens: {
      s: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '4k': '2560px',
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
