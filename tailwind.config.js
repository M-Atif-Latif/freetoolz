/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Professional color palette
        primary: {
          50: '#f0f5ff',
          100: '#e0ebfe',
          200: '#c5d9fd',
          300: '#a3bdfc',
          400: '#7c9efd',
          500: '#5b7aff',
          600: '#4552e6',
          700: '#3537cc',
          800: '#2d2eaa',
          900: '#1f1f5c',
          950: '#0f0f2e',
        },
        secondary: {
          50: '#f8f9ff',
          100: '#f0f2ff',
          200: '#e3e8ff',
          300: '#cdd5ff',
          400: '#a3aeff',
          500: '#8892ff',
          600: '#6b7aff',
          700: '#556dff',
          800: '#3f5aff',
          900: '#2f47cc',
        },
        accent: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#145231',
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },
      screens: {
        'xs': '475px',      // Extra small devices
        'sm': '640px',      // Small devices (phones)
        'md': '768px',      // Medium devices (tablets)
        'lg': '1024px',     // Large devices (laptops)
        'xl': '1280px',     // Extra large devices (desktops)
        '2xl': '1536px',    // 2X large devices (large desktops)
        '3xl': '1920px',    // 3X large devices (ultra-wide)
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      fontSize: {
        'xxs': '0.625rem',
        '2xs': '0.6875rem',
      },
      lineHeight: {
        'extra-loose': '2.5',
        '12': '3rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundSize: {
        '200': '200% 200%',
        '300': '300% 300%',
      },
    },
  },
  plugins: [],
};
