/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"League Spartan"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        navy: {
          900: '#0B2341',
          950: '#061528',
        },
        charcoal: '#17191C',
        'cool-grey': '#E9EDF1',
        'mid-grey': '#8A939E',
        meridian: {
          50: '#F0F5FF',
          100: '#E0EBFF',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1E40AF',
          800: '#1E3A8A',
          900: '#0B2341',
          950: '#061528',
        }
      }
    },
  },
  plugins: [],
};
