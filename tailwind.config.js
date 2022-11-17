/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./public/assets/*.{html,js}"
  ],
  theme: {
    extend: {
      animation: {
        'glow': 'glow 0.3s linear 1'
      },
      keyframes: {
        glow: {
          '0%, 100%': { transform: 'perspective(1px) translateZ(0)' },
          '50%': { transform: 'scale(1.2)' },
        }
      }

    },
  },
  plugins: [],
}
