import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Firebase is large and mostly unavoidable. Splitting it by SDK means the
    // public site does not pay for Storage code that only the admin editor and
    // the request form use.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          'firebase-core': ['firebase/app', 'firebase/firestore'],
          'firebase-auth': ['firebase/auth'],
          'firebase-storage': ['firebase/storage'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
