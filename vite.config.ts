import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";

function googleDocsProxyPlugin(): Plugin {
  return {
    name: "google-docs-proxy",
    configureServer(server) {
      server.middlewares.use("/api/story-doc", async (req, res) => {
        try {
          const docUrl = "https://docs.google.com/document/d/e/2PACX-1vSDgPHggNQ1tn_0oU5BexRmiT4if_ysKUxhK3RuK8ys43KZrxvxLjlw5y3ReiZL4C0Qnny11XVnkLjc/pub";
          const fetchRes = await fetch(docUrl);
          const html = await fetchRes.text();
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.end(html);
        } catch (e) {
          res.statusCode = 500;
          res.end("Failed to fetch doc");
        }
      });
    },
  };
}

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    tailwindcss(),
    command === "serve" ? jsxLocPlugin() : null,
    googleDocsProxyPlugin()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    allowedHosts: ["localhost", "127.0.0.1"],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
}));
