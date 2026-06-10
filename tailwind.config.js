/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Летний закатный градиент
        'sunset-peach': '#FFE5D9',
        'sunset-coral': '#FFCAB0',
        'sunset-pink': '#FFC2D1',
        'sunset-lavender': '#E5C1E8',
        'sunset-violet': '#C9A7EB',
        
        // Морские оттенки
        'ocean-light': '#E8F4F8',
        'ocean-soft': '#B8E0F6',
        'ocean-blue': '#87CEEB',
        'ocean-deep': '#4A90A4',
        
        // Романтичные акценты
        'romantic-pink': '#FFB6C1',
        'romantic-rose': '#FF8FA3',
        'romantic-gold': '#FFD700',
        
        // Пастельная база
        'cream': '#FFF9F0',
        'sand': '#F5E6D3',
      },
      fontFamily: {
        sans: ['Comfortaa', 'Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'float-fast': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'wave-slow': 'wave 15s linear infinite',
        'wave-medium': 'wave 10s linear infinite',
        'wave-fast': 'wave 7s linear infinite',
        'heart-beat': 'heartBeat 1.5s ease-in-out infinite',
        'seagull-fly': 'seagullFly 20s linear infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'sunset-shift': 'sunsetShift 8s ease-in-out infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(20px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.05)', opacity: 0.95 },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 182, 193, 0.4)' },
          '50%': { boxShadow: '0 0 35px rgba(255, 143, 163, 0.6)' },
        },
        wave: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-25%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        heartBeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.12)' },
          '40%': { transform: 'scale(1.05)' },
          '60%': { transform: 'scale(1.15)' },
        },
        seagullFly: {
          '0%': { transform: 'translateX(-100px) translateY(20px) scale(0.6)', opacity: 0 },
          '10%': { opacity: 0.6 },
          '90%': { opacity: 0.5 },
          '100%': { transform: 'translateX(500px) translateY(-60px) scale(0.8)', opacity: 0 },
        },
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        sunsetShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
