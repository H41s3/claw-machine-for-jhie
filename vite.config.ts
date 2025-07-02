import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Check if we're building for GitHub Pages
  const isGitHubPages = process.env.GITHUB_PAGES === 'true';
  
  return {
    base: isGitHubPages ? '/claw-machine-for-jhie/' : '/',
    server: {
      host: "::",
      port: 8080,
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
    plugins: [
      react(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
