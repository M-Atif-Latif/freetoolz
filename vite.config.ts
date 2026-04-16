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
    exclude: ['lucide-react', 'pako'],
    // Pre-bundle critical dependencies for faster load
    include: ['react', 'react-dom', 'react-router-dom', 'react/jsx-runtime'], 
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
        hoist_funs: true,
        hoist_props: true,
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
      external: ['pako'],
      output: {
        manualChunks(id) {
          // Critical path optimization - split by priority
          if (id.includes('node_modules')) {
            // Core React - highest priority (preloaded)
            if (id.includes('react') && !id.includes('lucide')) {
              return 'react-vendor';
            }
            
            // Router - critical for nav
            if (id.includes('react-router-dom')) {
              return 'router-vendor';
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
          
          // Components chunk
          if (id.includes('/src/components/')) {
            return 'components';
          }
          
          // Pages chunk
          if (id.includes('/src/pages/')) {
            return 'pages';
          }
          
          // Utils chunk
          if (id.includes('/src/utils/')) {
            return 'utils';
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
    assetsInlineLimit: 8192, // Increased from 4096 for better inline of small assets
    reportCompressedSize: true,
    target: 'es2020',
    // Additional build optimizations
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
