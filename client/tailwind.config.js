/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      regular: ['regular', 'Sans-serif'],
      bold: ['bold', 'Sans-serif'],
      thin: ['thin', 'Sans-serif'],
    },
    extend: {
      backgroundImage: {
        'default-pfp': "url('/public/default_pfp.jpg')",
        ellipsis: "url('/public/ellipsis.svg')",
      },
    },
  },
  plugins: [],
};
