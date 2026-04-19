import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined;
          }

          if (id.includes('/three/')) {
            return 'vendor-three';
          }

          if (id.includes('/gsap/')) {
            return 'vendor-gsap';
          }

          if (id.includes('/framer-motion/')) {
            return 'vendor-motion';
          }

          if (id.includes('/react-syntax-highlighter/')) {
            return 'vendor-syntax';
          }

          return 'vendor';
        }
      }
    }
  }
});
