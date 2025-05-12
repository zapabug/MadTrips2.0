/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  safelist: [
    'bg-bitcoin',
    'text-bitcoin',
    'border-bitcoin',
    'bg-ocean',
    'text-ocean',
    'border-ocean',
    'bg-forest',
    'text-forest',
    'border-forest',
    {
      pattern: /bg-(opacity|bitcoin|ocean|forest|sand|error|success|warning)-?/,
      variants: ['hover', 'focus', 'dark'],
    },
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        bitcoin: '#F7931A',
        ocean: '#1E3A8A',
        forest: '#0F4C35',
        
        // Ocean Theme
        caribbeanOcean: '#14857C',
        navyBlue: '#003366',
        aqua: '#5CDBCE',
        
        // Warm Colors
        deepAmber: '#D68000',
        softPeach: '#FFB84D',
        warmNatural: '#F5E3C3',
        sand: '#F5F5DC',
        
        // Grayscale
        charcoal: '#333333',
        steel: '#666666',
        silver: '#999999',
        
        // Nostr Color
        nostrPurple: '#800080',
        
        // Status Colors
        error: '#FF3333',
        success: '#33CC66',
        warning: '#FFB020',
        
        // Border and Background utilities
        border: '#14857C',
        background: '#14857C',
      },
      opacity: {
        '15': '0.15',
        '35': '0.35',
        '45': '0.45',
        '85': '0.85',
        '95': '0.95',
      },
      animation: {
        'fast-spin': 'spin 1s linear infinite',
        'progress-bar': 'progress 2s ease-in-out infinite',
        'fill-empty-bar': 'fillEmpty 4s ease-in-out infinite',
      },
      keyframes: {
        progress: {
          '0%': { width: '0%', left: '0%' },
          '50%': { width: '40%', left: '30%' },
          '100%': { width: '0%', left: '100%' }
        },
        fillEmpty: {
          '0%': { width: '0%', left: '0%', right: 'auto' },
          '45%': { width: '100%', left: '0%', right: 'auto' },
          '50%': { width: '100%', left: '0%', right: 'auto' },
          '50.1%': { width: '100%', left: 'auto', right: '0%' },
          '95%': { width: '0%', left: 'auto', right: '0%' },
          '100%': { width: '0%', left: '0%', right: 'auto' }
        }
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} 