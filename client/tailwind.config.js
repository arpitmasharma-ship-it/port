/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00d4ff',
          50: '#e0faff',
          100: '#b3f1ff',
          200: '#80e8ff',
          300: '#4dddff',
          400: '#1ad3ff',
          500: '#00d4ff',
          600: '#00a8cc',
          700: '#007d99',
          800: '#005366',
          900: '#002a33'
        },
        accent: {
          DEFAULT: '#0af',
          50: '#e0f7ff',
          100: '#b3ecff',
          200: '#80e0ff',
          300: '#4dd4ff',
          400: '#1ac8ff',
          500: '#0af',
          600: '#0088cc',
          700: '#006699',
          800: '#004466',
          900: '#002233'
        },
        portfolio: {
          blue: '#00d4ff',
          cyan: '#0af',
          glow: '#0088cc',
          dark: '#001a26',
          darker: '#000d13',
          panel: 'rgba(0, 212, 255, 0.05)',
        },
        dark: {
          100: '#0a1628',
          200: '#0d1f35',
          300: '#060e1a',
          400: '#020810'
        }
      },
      fontFamily: {
        heading: ['Orbitron', 'sans-serif'],
        body: ['Rajdhani', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-soft': 'bounceSoft 2s infinite',
        'spin-slow': 'spin 8s linear infinite',
        'gradient': 'gradient 8s ease infinite',
        'scan': 'scan 4s linear infinite',
        'pulse-ring': 'pulseRing 2s ease-out infinite',
        'hud-flicker': 'hudFlicker 3s ease-in-out infinite',
        'rotate-hud': 'rotateHud 10s linear infinite',
        'data-stream': 'dataStream 2s linear infinite',
        'arc-reactor': 'arcReactor 2s ease-in-out infinite',
        'holo-shine': 'holoShine 3s ease-in-out infinite',
        'glitch-1': 'glitch1 3s infinite',
        'glitch-2': 'glitch2 3s infinite',
        'neon-pulse': 'neonPulse 2s ease-in-out infinite',
        'border-glow': 'borderGlow 3s ease-in-out infinite',
        'circuit-flow': 'circuitFlow 4s linear infinite',
        'text-flicker': 'textFlicker 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.6)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        hudFlicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
          '52%': { opacity: '1' },
          '54%': { opacity: '0.6' },
          '56%': { opacity: '1' },
        },
        rotateHud: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        dataStream: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-100%)', opacity: '0' },
        },
        arcReactor: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.4), inset 0 0 20px rgba(0, 212, 255, 0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.8), inset 0 0 40px rgba(0, 212, 255, 0.2)' },
        },
        holoShine: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glitch1: {
          '0%, 100%': { clipPath: 'inset(0 0 0 0)', transform: 'translate(0)' },
          '20%': { clipPath: 'inset(20% 0 60% 0)', transform: 'translate(-3px, 1px)' },
          '40%': { clipPath: 'inset(60% 0 5% 0)', transform: 'translate(3px, -1px)' },
          '60%': { clipPath: 'inset(40% 0 30% 0)', transform: 'translate(-2px, 2px)' },
          '80%': { clipPath: 'inset(10% 0 70% 0)', transform: 'translate(2px, -2px)' },
        },
        glitch2: {
          '0%, 100%': { clipPath: 'inset(0 0 0 0)', transform: 'translate(0)' },
          '20%': { clipPath: 'inset(70% 0 10% 0)', transform: 'translate(3px, -1px)' },
          '40%': { clipPath: 'inset(10% 0 60% 0)', transform: 'translate(-3px, 1px)' },
          '60%': { clipPath: 'inset(50% 0 20% 0)', transform: 'translate(2px, 2px)' },
          '80%': { clipPath: 'inset(30% 0 40% 0)', transform: 'translate(-2px, -2px)' },
        },
        neonPulse: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 212, 255, 0.3), inset 0 0 5px rgba(0, 212, 255, 0.1)', borderColor: 'rgba(0, 212, 255, 0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.6), inset 0 0 15px rgba(0, 212, 255, 0.2)', borderColor: 'rgba(0, 212, 255, 0.5)' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(0, 212, 255, 0.1)' },
          '50%': { borderColor: 'rgba(0, 212, 255, 0.4)' },
        },
        circuitFlow: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        textFlicker: {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.6' },
          '94%': { opacity: '1' },
          '96%': { opacity: '0.8' },
          '97%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hud-grid': 'linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'hud-grid': '40px 40px',
      }
    },
  },
  plugins: [],
}
