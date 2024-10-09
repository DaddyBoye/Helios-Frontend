/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
            transform: 'scale(1.1) rotate(180deg)',
            filter: 'drop-shadow(0 0 40px rgba(255, 255, 0, 1))', // Stronger glow effect
          },
        },
      },
      animation: {
        spinZoomGlow: 'spinZoomGlow 3s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}
