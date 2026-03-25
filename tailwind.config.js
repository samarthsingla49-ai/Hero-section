/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-purple': '#8B5CF6',
        'brand-pink': '#EC4899',
        'brand-orange': '#F59E0B',
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
        'spin-slower': 'spin 45s linear infinite',
        'spin-slowest': 'spin 60s linear infinite',
      },
    },
  },
  plugins: [],
}
