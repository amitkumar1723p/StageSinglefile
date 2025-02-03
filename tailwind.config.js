/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens: {
        'max-320': {'max': '320px'}, // For max-width 320px
        'max-375': {'max': '375px'}, // For max-width 375px
        'max-480': {'max': '480px'}, // For max-width 480px
        'max-768': {'max': '768px'}, // For max-width 768px
        'min-768':{'min': '768px'}
      },
    },
  },
  plugins: [],
}