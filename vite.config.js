import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "biotech_shell",
      filename: "remoteEntry.js",
      remotes: {
        authMF:
          process.env.VITE_AUTH_MF ||
          "http://localhost:5001/assets/remoteEntry.js",
        animalsMF:
          process.env.VITE_ANIMALS_MF ||
          "http://localhost:5002/assets/remoteEntry.js",
        feedingMF:
          process.env.VITE_FEEDING_MF ||
          "http://localhost:5003/assets/remoteEntry.js",
        healthMF:
          process.env.VITE_HEALTH_MF ||
          "http://localhost:5004/assets/remoteEntry.js",
        reproductionMF:
          process.env.VITE_REPRODUCTION_MF ||
          "http://localhost:5005/assets/remoteEntry.js",
        inventoryMF:
          process.env.VITE_INVENTORY_MF ||
          "http://localhost:5006/assets/remoteEntry.js",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: "^19.0.0",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^19.0.0",
        },
        "react-router-dom": {
          singleton: true,
        },
        zustand: { singleton: true },
        "framer-motion": { singleton: true },
        "lucide-react": { singleton: true },
      },
    }),
  ],
  build: {
    target: "es2020",
    minify: "terser",
  },
  server: {
    port: 5000,
    strictPort: true,
  },
});
