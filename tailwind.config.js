/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        '120': '1.2',
      },
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
      },
      keyframes: {
        spinZoomGlow: {
          '0%, 100%': {
            transform: 'scale(1) rotate(0deg)',
            filter: 'drop-shadow(0 0 0 rgba(0,0,0,0))', // No shadow when normal
          },
          '50%': {
            transform: 'scale(1.2) rotate(180deg)',
            filter: 'drop-shadow(0 0 20px rgba(255, 255, 0, 1))', // Stronger glow effect
          },
        },
      },
      animation: {
        spinZoomGlow: 'spinZoomGlow 3s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};
