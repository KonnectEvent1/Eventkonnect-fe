import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  esbuild: {
    target: "esnext", // avoids module.exports export issues
  },
});


import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});

import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss()],
});


