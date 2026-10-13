import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  // Rutas relativas: el mismo build sirve en GitHub Pages (subcarpeta), Netlify o Vercel.
  base: './',
  plugins: [react()],
  resolve: {
    alias: { '@cumbre/core': fileURLToPath(new URL('../packages/core/src/index.ts', import.meta.url)) },
  },
  server: { fs: { allow: ['..'] } },
});
