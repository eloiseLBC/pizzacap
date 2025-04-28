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
    darkMode: ['class'],
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

                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    1: 'hsl(var(--chart-1))',
                    2: 'hsl(var(--chart-2))',
                    3: 'hsl(var(--chart-3))',
                    4: 'hsl(var(--chart-4))',
                    5: 'hsl(var(--chart-5))',
                },
            },
            fontFamily: {
                jost: ['Jost', 'sans-serif'],
                outfit: ['Outfit', 'sans-serif'],
                sulphur: ['Sulphur Point', 'sans-serif'],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
        },
    },
    plugins: [
        require('tailwindcss-highlights'),
        require('tailwindcss-animate'),
    ],
};
