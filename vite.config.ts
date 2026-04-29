import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // Optimize JSX runtime for smaller bundle
      jsxRuntime: 'automatic',
      // Enable Fast Refresh for better dev experience
      fastRefresh: true,
    }),
  ],
  // Configure public directory for static assets
  publicDir: 'public',
  optimizeDeps: {
    // Exclude packages that have complex CJS/ESM interop
    exclude: ['lucide-react'],
    // Pre-bundle critical dependencies for faster load
    include: ['react', 'react-dom', 'react-router-dom', 'react/jsx-runtime', 'pako'], 
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
        toplevel: false,
        side_effects: true,
        hoist_funs: true,
        hoist_props: true,
      },
      mangle: {
        safari10: true,
        toplevel: false,
      },
      format: {
        comments: false,
        ecma: 2020,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // PERFORMANCE: Aggressive code splitting to reduce main bundle and improve LCP
          
          // Node modules - split by category
          if (id.includes('node_modules')) {
            // Core React - must be bundled together to prevent __SECRET_INTERNALS errors
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/scheduler/')) {
              return 'react-vendor';
            }
            
            // React Router - critical for navigation
            if (id.includes('react-router-dom')) {
              return 'react-router';
            }
            
            // React Helmet - defer to reduce main bundle
            if (id.includes('react-helmet')) {
              return 'helmet';
            }
            
            // PDF libraries - lazy loaded for tools
            if (id.includes('pdf-lib') || id.includes('pdfjs')) {
              return 'pdf-lib';
            }
            
            // Markdown parser - lazy loaded
            if (id.includes('react-markdown') || id.includes('remark')) {
              return 'markdown';
            }
            
            // Icons library - defer loading (heavy)
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            
            // Supabase - only needed for certain features
            if (id.includes('@supabase')) {
              return 'supabase';
            }
            
            // Default vendor chunk for other modules
            return 'vendor';
          }
          
          // Route-based tools - individual chunks
          if (id.includes('/src/tools/')) {
            const match = id.match(/\/tools\/([^/]+)\./);
            if (match) {
              return `tool-${match[1]}`;
            }
          }
          
          // Pages - individual chunks for lazy routes
          if (id.includes('/src/pages/')) {
            const match = id.match(/\/pages\/([^/]+)\./);
            if (match) {
              return `page-${match[1]}`;
            }
          }
          
          // Components - split into smaller chunks
          if (id.includes('/src/components/')) {
            const match = id.match(/\/components\/([^/]+)\./);
            if (match) {
              return `comp-${match[1]}`;
            }
          }
          
          // Utils - keep together but as separate chunk
          if (id.includes('/src/utils/')) {
            return 'utils';
          }
          
          // Data - keep together
          if (id.includes('/src/data/')) {
            return 'data';
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    sourcemap: false,
    chunkSizeWarningLimit: 400,
    cssCodeSplit: true,
    modulePreload: {
      polyfill: false, // Disable polyfill for faster load in modern browsers
    },
    assetsInlineLimit: 4096, // Keep SVGs external for better caching
    reportCompressedSize: true,
    target: 'es2020',
    ssr: false,
    commonjsOptions: {
      transformMixedEsModules: true,
      esmExternals: true,
    },
  },
  server: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
    },
  },
});
