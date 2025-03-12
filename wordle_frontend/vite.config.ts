import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Proxy configuration for API requests
  server: {
    proxy: {
      "/api": {
        target: "http://backend:8000", // Backend server URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});