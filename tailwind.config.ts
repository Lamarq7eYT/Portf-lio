import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#090b0f',
        panel: '#0d1117',
        border: '#1e2d3d',
        hacker: '#00ff88',
        cyan: '#00e5ff',
        breach: '#ff2d55',
        amber: '#ffb800',
        muted: '#64748b'
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        body: ['system-ui', 'sans-serif']
      },
      boxShadow: {
        neon: '0 0 28px rgba(0,255,136,0.22)',
        cyan: '0 0 30px rgba(0,229,255,0.2)',
        breach: '0 0 30px rgba(255,45,85,0.2)'
      }
    }
  },
  plugins: []
} satisfies Config;
