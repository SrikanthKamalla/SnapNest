import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    port: 5173,
    host: true,
    allowedHosts: ['snap-nest-server.onrender.com/'],
  },
});
