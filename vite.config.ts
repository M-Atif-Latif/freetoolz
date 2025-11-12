import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // Optimize JSX runtime for smaller bundle
      jsxRuntime: 'automatic',
    }),
  ],
  // Configure public directory for static assets
  publicDir: 'public',
  optimizeDeps: {
    // Exclude large packages from pre-bundling
    exclude: ['lucide-react'],
    // Pre-bundle critical dependencies for faster load
    include: ['react', 'react-dom', 'react/jsx-runtime'], 
    // Force pre-bundling on server start
    force: false,
  },
  build: {
    // Use terser for aggressive minification
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
          // Separate React ecosystem - highest priority, loaded first
          if (id.includes('node_modules')) {
            // Core React - smallest bundle, loaded immediately
            if (id.includes('react') && !id.includes('lucide')) {
              if (id.includes('react-dom')) return 'react-dom';
              if (id.includes('scheduler')) return 'react-core';
              return 'react-core';
            }
            
            // Heavy PDF libraries - defer loading
            if (id.includes('pdf-lib') || id.includes('pdfjs')) {
              return 'pdf-vendor';
            }
            
            // Icons - defer and split separately (large library)
            if (id.includes('lucide-react')) {
              return 'icons-vendor';
            }
            
            // Group other vendor packages by size
            return 'vendor';
          }
          
          // Split tools into individual micro-chunks for optimal loading
          if (id.includes('/src/tools/')) {
            const toolName = id.split('/tools/')[1].split('.')[0];
            return `tool-${toolName}`;
          }
          
          // Split pages separately for route-based code splitting
          if (id.includes('/src/pages/')) {
            const pageName = id.split('/pages/')[1].split('.')[0];
            return `page-${pageName}`;
          }
          
          // Components bundle - only common components
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
