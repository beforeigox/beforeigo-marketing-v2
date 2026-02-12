import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Note: Public directory copying disabled due to corrupted files
    // Files in /public have file system errors (EAGAIN)
    copyPublicDir: true
  }
});
