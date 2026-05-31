/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      colors: {
        sos: {
          red: '#CC0000',
          'red-dark': '#990000',
          'red-glow': '#FF3333',
        },
        dark: {
          900: '#0d0d0d',
          800: '#1a1a1a',
          700: '#262626',
          600: '#333333',
          500: '#4d4d4d',
        },
        accent: {
          hospital: '#4FC3F7',
          ambulance: '#FF7043',
          police: '#7E57C2',
          towing: '#FFB74D',
          puncture: '#66BB6A',
        }
      },
      animation: {
        'sos-pulse': 'sosPulse 2s ease-in-out infinite',
        'sos-ring': 'sosRing 2s ease-out infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        sosPulse: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(204,0,0,0.7)' },
          '50%': { transform: 'scale(1.05)', boxShadow: '0 0 30px 10px rgba(204,0,0,0.3)' },
        },
        sosRing: {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
