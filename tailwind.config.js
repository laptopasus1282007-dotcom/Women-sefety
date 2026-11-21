/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        safety: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        }
      },
      animation: {
        'pulse-fast': 'pulse 0.8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'strobe': 'strobe 0.15s steps(2, start) infinite',
      },
      keyframes: {
        strobe: {
          '0%, 100%': { backgroundColor: '#ffffff', filter: 'invert(0)' },
          '50%': { backgroundColor: '#000000', filter: 'invert(1)' },
        }
      }
    },
  },
  plugins: [],
}
