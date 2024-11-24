import { defineConfig } from 'vite';
import path from "path"
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ 
      emitFile: true,
      filename: 'bundle-analysis.html',
      open: true,
      sourcemap: true, // Enable source maps for the visualizer
    }),
  ],
  build: {
    sourcemap: true, // Enable source maps for the build
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  },
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    host: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '@/components': path.resolve(__dirname, './src/components'),
    },
  },
});
