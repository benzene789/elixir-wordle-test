import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    plugins: [react(), tailwindcss()],

    // Proxy configuration for API requests
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL || "http://127.0.0.1:8000", // Use environment variable or fallback to localhost
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});