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
        'default-pfp': "url('/default_pfp.jpg')",
        home: 'url(/home.svg)',
        profile: 'url(/profile.svg)',
      },
      colors: {
        primary: '#FFF0D1',
        secondary: '#795757',
        third: '#664343',
        fourth: '#3B3030',
      },
    },
  },
  plugins: [],
};
