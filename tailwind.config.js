const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./public/index.html",
    "./public/*.{html,js}",
    "./public/assets/*.{html,js}"
  ],
  theme: {
    screens: {
      'xs': '320px',
      ...defaultTheme.screens,
    },
    fontFamily: {
      sans: ["Ruda", ...defaultTheme.fontFamily.sans],
      prose: ["Space Grotesk", ...defaultTheme.fontFamily.sans]
    },
    extend: {
      colors: {
        'lime': '#e8e000',
        'high': 'rgba(0, 230, 107, 0.7)',
        'high_blue': 'rgba(70, 221, 222, 0.7)'
  
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
        'narrowscreen': '8 / 9',
        'widescreen': '21 / 9',
      },
      backgroundImage: (theme) => ({
        'underline-high': `linear-gradient(0deg, transparent 0%, transparent 15%, ${theme('colors.lime')} 15%, ${theme('colors.lime')} 70%, transparent 70%)`,
        'underline-link': `linear-gradient(0deg, transparent 0%, transparent 15%, ${theme('colors.lime')} 15%, ${theme('colors.lime')} 70%, transparent 70%)`
        
      })
    }
  },
  plugins: [],
}
