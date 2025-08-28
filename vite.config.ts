import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
<<<<<<< HEAD

export default defineConfig({
  plugins: [react()],
  esbuild: {
    target: "esnext", // avoids module.exports export issues
  },
});
=======
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
>>>>>>> daef4dd (setup project)
