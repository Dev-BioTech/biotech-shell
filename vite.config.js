import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Cargar variables de entorno según el modo
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@features": path.resolve(__dirname, "./src/features"),
        "@shared": path.resolve(__dirname, "./src/shared"),
      },
    },
    plugins: [
      react(),
      federation({
        name: "biotech_shell",
        filename: "remoteEntry.js",
        remotes: {
          authMF:
            env.VITE_AUTH_MF ||
            "http://localhost:5001/assets/remoteEntry.js",
          animalsMF:
            env.VITE_ANIMALS_MF ||
            "http://localhost:5002/assets/remoteEntry.js",
          feedingMF:
            env.VITE_FEEDING_MF ||
            "http://localhost:5003/assets/remoteEntry.js",
          healthMF:
            env.VITE_HEALTH_MF ||
            "http://localhost:5004/assets/remoteEntry.js",
          reproductionMF:
            env.VITE_REPRODUCTION_MF ||
            "http://localhost:5005/assets/remoteEntry.js",
          inventoryMF:
            env.VITE_INVENTORY_MF ||
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
      target: "esnext",
      minify: false,
    },
    server: {
      port: 5173,
      strictPort: false,
    },
  };
});
