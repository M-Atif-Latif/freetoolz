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
    // Enable deeper dependency optimization
    esbuildOptions: {
      treeShaking: true,
      target: 'es2020',
    },
  },
  build: {
    // Use terser for aggressive minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
        passes: 3,
        ecma: 2020,
        unsafe_arrows: true,
        unsafe_methods: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_proto: true,
        dead_code: true,
        unused: true,
        toplevel: true,
        side_effects: true,
      },
      mangle: {
        safari10: true,
        toplevel: true,
      },
      format: {
        comments: false,
        ecma: 2020,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Critical path optimization - split by priority
          if (id.includes('node_modules')) {
            // Core React - highest priority (preloaded)
            if (id.includes('react') && !id.includes('lucide')) {
              return 'react-vendor';
            }
            
            // PDF libraries - lazy loaded
            if (id.includes('pdf-lib') || id.includes('pdfjs')) {
              return 'pdf-vendor';
            }
            
            // Icons - defer loading
            if (id.includes('lucide-react')) {
              return 'icons-vendor';
            }
            
            // Other vendors
            return 'vendor';
          }
          
          // Micro-chunks for tools (route-based splitting)
          if (id.includes('/src/tools/')) {
            const toolName = id.split('/tools/')[1].split('.')[0];
            return `tool-${toolName}`;
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    sourcemap: false, // Disable sourcemaps for production
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    modulePreload: {
      polyfill: true,
    },
    assetsInlineLimit: 4096,
    reportCompressedSize: true,
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
