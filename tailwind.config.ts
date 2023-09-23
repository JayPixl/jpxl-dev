import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        "fira-mono": ["Fira Mono", "mono"],
        "fira-sans": ["Fira Sans", "sans"]
      },
      colors: {
        "primary": {
          "dark-600": "#57534e",
          "dark-800": "#292524",
          "dark-900": "#1c1917",
          "dark-950": "#0c0a09",
          "light-200": "#e7e5e4"
        }
      }
    },
  },
  plugins: [],
} satisfies Config

