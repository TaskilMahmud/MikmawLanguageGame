
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // Required for GitHub Pages and public/audio/ paths.
  base: "/MikmawLanguageGame/",

  // Avoids the Windows EACCES error previously seen on port 5173.
  server: {
    host: "127.0.0.1",
    port: 30000,
  },
});
