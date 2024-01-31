/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        // This solves the issue of the height of the screen not being 100vh on mobile devices.
        screen: '100dvh',
      },
    },
  },
  plugins: [],
}

