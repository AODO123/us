/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          light: '#FAF8F5',
          DEFAULT: '#F6F1EB',
          aged: '#EEE7DE',
          card: '#FCFAF7',
          border: '#E4DBD0',
        },
        maroon: {
          light: '#9E2A3B',
          DEFAULT: '#7A1C2B',
          deep: '#4E0F1A',
          tint: '#F9ECEE',
        },
        ink: {
          DEFAULT: '#2C2224',
          muted: '#635456',
          faint: '#98898C',
          border: '#DDD2CE',
        },
        pastel: {
          blush: '#F7D6CF',
          sage: '#D7E2D8',
          butter: '#FBE8A6',
          lavender: '#DFD7EC',
          sky: '#D3E4EC',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
        hand: ['Caveat', 'Patrick Hand', 'cursive'],
      },
      boxShadow: {
        paper: '0 4px 20px -2px rgba(44, 34, 36, 0.05), 0 2px 6px -1px rgba(122, 28, 43, 0.04)',
        'paper-lg': '0 16px 40px -10px rgba(122, 28, 43, 0.09), 0 6px 16px -2px rgba(44, 34, 36, 0.05)',
        'paper-float': '0 24px 50px -12px rgba(122, 28, 43, 0.14), 0 8px 24px -4px rgba(44, 34, 36, 0.08)',
        tactile: '0 3px 0 0 #D8CEC2, 0 10px 25px -4px rgba(44, 34, 36, 0.07)',
        pressed: '0 1px 0 0 #D8CEC2, 0 2px 6px rgba(44, 34, 36, 0.05)',
        stamp: '0 1px 3px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(122, 28, 43, 0.1)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-warm': 'pulseWarm 3s ease-in-out infinite',
        wiggle: 'wiggle 0.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(0.5deg)' },
        },
        pulseWarm: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.92', transform: 'scale(1.02)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
      },
    },
  },
  plugins: [],
};
