import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  app.get("/api/story-doc", async (req, res) => {
    try {
      const docUrl = "https://docs.google.com/document/d/e/2PACX-1vSDgPHggNQ1tn_0oU5BexRmiT4if_ysKUxhK3RuK8ys43KZrxvxLjlw5y3ReiZL4C0Qnny11XVnkLjc/pub";
      const fetchRes = await fetch(docUrl);
      const html = await fetchRes.text();
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.send(html);
    } catch (e) {
      res.status(500).send("Failed to fetch doc");
    }
  });

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
