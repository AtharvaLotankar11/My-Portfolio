/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Core palette, sampled from the Canva cover (charcoal sky, bone type, blush + slate facade)
        primary: "#1C1C1C",        // page base (ink)
        secondary: "#262626",      // raised surface
        charcoal: "#2F2F2F",       // hero sky
        bone: "#E6E6E6",           // display type
        blush: "#E3BFB2",          // facade pink - interactive highlight
        "blush-deep": "#C99A8A",
        accent: "#98AEB3",         // facade slate (kept from the previous theme so Login/Register still match)
        "accent-glow": "#B0C4C8",
        earth: "#967D6A",
        "earth-glow": "#A8907E",
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['"Roboto Mono"', 'ui-monospace', 'monospace'],
        display: ['Anton', 'Impact', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
