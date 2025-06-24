import vue from "@vitejs/plugin-vue";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    sourcemap: false,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@use \"@/styles/variables.scss\" as *;",
      },
    },
    postcss: "./postcss.config.js",
  },
});
