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
      "/ws": {
        target: "http://localhost:8080"
      },
      "/app": {
        target: "ws://localhost:8080",
        ws: true
      },
      "/topic": {
        target: "ws://localhost:8080",
        ws: true
      }
    }
  }
});
