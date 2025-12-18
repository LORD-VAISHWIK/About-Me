/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: '#02040a',
        surface: 'rgba(255, 255, 255, 0.03)',
        primary: '#ffffff',
        secondary: '#cbd5e1',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'blob': 'blob 10s infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.2)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.8)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      }
    }
  },
  plugins: [],
}

