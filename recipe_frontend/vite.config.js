import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// PUBLIC_BACKEND_URL env variable will be used for API endpoint.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  define: {
    'process.env': {}
  }
});
