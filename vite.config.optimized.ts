import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react-vendor';
            if (id.includes('pdf-lib')) return 'pdf-vendor';
            if (id.includes('lucide-react')) return 'icons-vendor';
            return 'vendor';
          }
          if (id.includes('/src/tools/')) {
            const toolName = id.split('/tools/')[1].split('.')[0];
            return `tool-${toolName}`;
          }
        },
      },
    },
    sourcemap: false,
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
  },
  server: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
    },
  },
});
