import type { Config } from 'tailwindcss'

import {
  orange,
  blue,
  plum,
  gray,
  green,
  orangeDark,
  blueDark,
  plumDark,
  grayDark,
  greenDark,
  whiteA,
  blackA
} from '@radix-ui/colors';
import { transparent } from 'tailwindcss/colors'

const config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    fontFamily: {
      'poppins': 'var(--font-poppins)',
      'montserrat': 'var(--font-montserrat)'
    },

    colors: {
      'blue': { ...blue },
      'darkBlue': { ...blueDark },
      'green': { ...green},
      'darkGreen': {...greenDark},
      'orange': {...orange},
      'darkOrange': {...orangeDark},
      'plum': {...plum},
      'darkPlum': {...plumDark},
      'gray': {...gray},
      'darkGray': {...grayDark},
      'transparent': transparent,
      'black': {...blackA},
      'white': {...whiteA}
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
} satisfies Config

export default config
