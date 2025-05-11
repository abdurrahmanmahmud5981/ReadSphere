import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // or 'media'
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#8B5DFF',
        secondary: '#4dc049',
        danger: '#e74c3c',
        success: '#2ecc71',
        info: '#34495e',
        warning: '#f1c40f',
        light: '#f8f9fa',
        dark: '#343a40',
      }
    },
  },
  plugins: [daisyui],
}