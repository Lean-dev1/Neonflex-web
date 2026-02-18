/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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