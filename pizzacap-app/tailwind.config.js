/** @type {import('tailwindcss').Config} */

/* Implementation of figma theme 
   Note : naming of color is inspired from Material theme
*/
/* ** QUICK REFERENCE ABOUT FONTS ** 
    - Jost extralight is jost-200
    - Jost regular is jost-400
    - Sulphur point bold is sulphur-point-700
    - Outfit semibold is outfit-600
*/
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
              primary: '#326625',
              'primary-variant': '#07a95a',
              secondary: '#d1b381',
              'secondary-variant': '#eadac0',
              tertiary: '#c32105',
              error: '#c32105',
              surface: '#fffff4',
            },
            fontFamily: {
              jost: ['Jost', 'sans-serif'],
              outfit: ['Outfit', 'sans-serif'],
              sulphur: ['Sulphur Point', 'sans-serif'],
            },
          },
    },
    plugins: [],
};
