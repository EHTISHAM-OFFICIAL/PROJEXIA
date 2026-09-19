import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Firebase Storage was replaced with imgBB (see src/services/imgbbService.ts)
    // to avoid the Blaze-plan requirement, so it's no longer split out here.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          'firebase-core': ['firebase/app', 'firebase/firestore'],
          'firebase-auth': ['firebase/auth'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
