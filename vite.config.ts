import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/my-dev-page/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/@xyflow/'))    return 'vendor-flow';
          if (id.includes('/node_modules/framer-motion')) return 'vendor-motion';
          if (id.includes('/node_modules/@dnd-kit/'))   return 'vendor-dnd';
          if (id.includes('/node_modules/react-router') ||
              id.includes('/node_modules/react-dom/')   ||
              id.includes('/node_modules/react/'))      return 'vendor-react';
        },
      },
    },
  },
});
