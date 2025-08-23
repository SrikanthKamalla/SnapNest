import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    port: 5173,
    host: true,
    allowedHosts: ['snapnest-a72n.onrender.com'], // 👈 Add this line
  },
});
