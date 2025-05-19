import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "127.0.0.1",
    proxy: {
      "/api": {
        target: "https://djchat-backend-5138510de4de.herokuapp.com/",
        changeOrigin: true,
      },
      "/media": {
        target: "https://djchat-backend-5138510de4de.herokuapp.com/",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    TanStackRouterVite({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
  ],
});
