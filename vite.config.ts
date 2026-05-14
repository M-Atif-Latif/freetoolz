import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // Optimize JSX runtime for smaller bundle
      jsxRuntime: 'automatic',
      // Enable Fast Refresh for better dev experience
      fastRefresh: true,
      // Disable babel for tools using config file instead
      babel: {
        babelrc: false,
        configFile: false,
      },
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
      target: 'es2022',
    },
  },
  build: {
    // Use esbuild for faster builds (terser is slower but better compression)
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
        passes: 3,
        ecma: 2022,
        unsafe_arrows: true,
        unsafe_methods: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        dead_code: true,
        unused: true,
        toplevel: false,
        side_effects: true,
        hoist_funs: true,
        hoist_props: true,
        collapse_vars: true,
        reduce_vars: true,
        inline: 3,
      },
      mangle: {
        safari10: true,
        toplevel: false,
        properties: {
          regex: '^_',
        },
      },
      format: {
        comments: false,
        ecma: 2022,
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
          
          // Route-based tools - individual chunks (lazy loaded)
          if (id.includes('/src/tools/')) {
            return 'tools-lazy';
          }
          
          // Pages - individual chunks for lazy routes
          if (id.includes('/src/pages/')) {
            return 'pages-lazy';
          }
          
          // Components - split into smaller chunks
          if (id.includes('/src/components/')) {
            return 'components';
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
    chunkSizeWarningLimit: 300,
    cssCodeSplit: true,
    cssMinify: true,
    modulePreload: {
      polyfill: false, // Disable polyfill for faster load in modern browsers
    },
    assetsInlineLimit: 2048, // Keep SVGs external for better caching (reduced from 4096)
    reportCompressedSize: true,
    target: 'es2022',
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
