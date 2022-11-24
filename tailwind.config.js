const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./public/index.html",
    "./public/assets/*.{html,js}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["nunito", ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'glow': 'glow 0.3s linear 1'
      },
      keyframes: {
        glow: {
          '0%, 100%': { transform: 'perspective(1px) translateZ(0)' },
          '50%': { transform: 'scale(1.2)' },
        }
      },
      screens: {
        '3xl': '2100px',
      },
      aspectRatio: {
        'widescreen': '21 / 9',
      }
    }
  },
  plugins: [],
}
