import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,ts,tsx,md,mdx,html}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#1a2b4a',
          50: '#f2f4f8',
          100: '#dbe2ec',
          200: '#b7c4d9',
          300: '#8fa4bf',
          400: '#5d7397',
          500: '#3a5276',
          600: '#2a3d5c',
          700: '#1a2b4a',
          800: '#141f36',
          900: '#0c1424',
        },
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
