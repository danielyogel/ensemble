/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extends: {
      spacing: {
        0.25: '0.062.5rem',
        24: '6rem'
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: 'white',
      black: 'black',
      danger: {
        DEFAULT: '#EC4899',
        light: '#fad8e9'
      },

      primary: '#07C111',

      gray: {
        darkest: '#1f2d3d',
        dark: '#757575',
        DEFAULT: '#c0ccda',
        light: '#d9d9d9',
        lightest: '#F7F7F7'
      }
    }
  }
};
