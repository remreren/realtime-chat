import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
      "/ws": {
        target: "ws://localhost:8080",
        changeOrigin: true,
        ws: true,
        rewrite: path => path.replace(/^\/ws/, '')
      },
      "/app": {
        target: "ws://localhost:8080",
        changeOrigin: true,
        ws: true
      },
      "/topic": {
        target: "ws://localhost:8080",
        changeOrigin: true,
        ws: true
      }
    }
  }
});
