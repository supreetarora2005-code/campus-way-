/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f4f7fa',
          100: '#e6edf5',
          200: '#c9d8e9',
          300: '#a1bad6',
          400: '#7196bd',
          500: '#4d77a4',
          600: '#3a5e89',
          700: '#304c6f',
          800: '#2a415c',
          900: '#1b2e44',
          950: '#101f30',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
      },
      boxShadow: {
        card: '0 1px 3px rgba(27, 46, 68, 0.08), 0 8px 24px rgba(27, 46, 68, 0.06)',
        'card-hover':
          '0 2px 6px rgba(27, 46, 68, 0.1), 0 16px 40px rgba(27, 46, 68, 0.12)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Sora"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
