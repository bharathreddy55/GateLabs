import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 600,
    rolldownOptions: {
      output: {
        manualChunks(id){if(id.includes('/node_modules/@firebase/')||id.includes('/node_modules/firebase/'))return 'firebase';if(id.includes('/node_modules/chart.js/'))return 'chart';}
      }
    }
  }
});
