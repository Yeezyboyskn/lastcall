import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: path.resolve(projectRoot, "pages"),
  base: "/lastcall/",
  publicDir: path.resolve(projectRoot, "public"),
  plugins: [react()],
  build: {
    outDir: path.resolve(projectRoot, "docs"),
    emptyOutDir: true,
  },
});
