// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        deep:    '#0B0618',
        mid:     '#120D24',
        surface: '#1A1030',
        card:    '#1E1438',
        purple:  '#7B4FFF',
        'purple-bright': '#9B6FFF',
        neon:    '#B794FF',
        tech:    '#6366F1',
        biz:     '#10B981',
      },
      fontFamily: {
        display: ['var(--font-syne)', 'Syne', 'sans-serif'],
        body:    ['var(--font-dm-sans)', 'DM Sans', 'sans-serif'],
        arabic:  ['var(--font-arabic)', 'Noto Kufi Arabic', 'sans-serif'],
      },
      animation: {
        'radar-sweep': 'radarSweep 4s linear infinite',
        'pulse-dot':   'pdot 2s ease-in-out infinite',
        'fade-in':     'fadeInUp .4s ease both',
      },
    },
  },
  plugins: [],
};

export default config;
