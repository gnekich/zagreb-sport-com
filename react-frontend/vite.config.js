import { defineConfig } from 'vite';
import path from "path";
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Build directory is in special path
  build: {
    outDir: "../wrangler-cloudflare-pages/pages",
  },
})
