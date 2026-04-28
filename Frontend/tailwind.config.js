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
        // Al pisar "sans", le decimos a toda la web que use esta fuente por defecto
        sans: ['"Tilt Neon"', 'sans-serif'], 
        // Dejamos "tilt" por si ya lo usaste en alguna clase como font-tilt
        tilt: ['"Tilt Neon"', 'sans-serif'], 
      },
      colors: {
        // Azul vibrante (tipo eléctrico)
        'neon-blue': '#00F0FF', 
        // ROJO INTENSO (Nuevo protagonista)
        'neon-red': '#FF1744', 
        // Mantenemos el pink por si acaso, pero usaremos menos
        'neon-pink': '#E040FB', 
        // Un violeta oscuro para fondos
        'neon-purple': '#7B1FA2',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        shimmer: 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}