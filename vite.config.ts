import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Configure public directory for static assets
  publicDir: 'public',
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom'], // Pre-bundle critical dependencies
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2,
        ecma: 2020,
        unsafe_arrows: true,
        unsafe_methods: true,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false, // Remove all comments
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Separate React ecosystem
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
              return 'react-vendor';
            }
            if (id.includes('pdf-lib') || id.includes('pdfjs')) {
              return 'pdf-vendor';
            }
            if (id.includes('lucide-react')) {
              return 'icons-vendor';
            }
            // Group other small vendor packages
            return 'vendor';
          }
          
          // Split tools into smaller chunks by category
          if (id.includes('/src/tools/')) {
            const toolName = id.split('/tools/')[1].split('.')[0];
            return `tool-${toolName}`;
          }
          
          // Split pages
          if (id.includes('/src/pages/')) {
            const pageName = id.split('/pages/')[1].split('.')[0];
            return `page-${pageName}`;
          }
          
          // Split components if they're large
          if (id.includes('/src/components/')) {
            return 'components';
          }
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    sourcemap: 'hidden', // Generate source maps but don't reference them in bundle
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    // Enable module preloading
    modulePreload: {
      polyfill: true,
    },
    // Optimize asset inlining
    assetsInlineLimit: 4096, // 4kb
    // Report compressed size for better bundle analysis
    reportCompressedSize: true,
    // Target modern browsers for better optimizations
    target: 'es2020',
  },
  server: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
    },
  },
});
