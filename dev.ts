/**
 * Bun Dev Server
 * Serves HTML and compiles TypeScript on the fly
 */

import { watch } from "node:fs";

// Track connected clients
const server = Bun.serve({
  port: 4000,

  // Enable websockets
  websocket: {
    open(ws) {
      ws.subscribe("hmr");
    },
    message() { }, // No-op
  },

  async fetch(req, server) {
    const url = new URL(req.url);
    console.log(`[Request] ${url.pathname}`);

    // Handle HMR websocket upgrade
    if (url.pathname === "/_hmr") {
      const success = server.upgrade(req);
      return success ? undefined : new Response("WebSocket upgrade error", { status: 400 });
    }

    let path = url.pathname;

    // Serve index.html for root
    if (path === "/") {
      path = "/index.html";
    }

    // INTERCEPT index.html to inject HMR script
    if (path === "/index.html") {
      let html = await Bun.file("index.html").text();
      const hmrScript = `
       <script>
         (function() {
           let ws = new WebSocket("ws://" + location.host + "/_hmr");
           ws.onmessage = (msg) => { 
             if(msg.data === "reload") {
               console.log("🔥 Reloading...");
               location.reload(); 
             }
           };
           ws.onclose = () => console.log("Disconnected from HMR");
           console.log("🔥 HMR Connected");
         })();
       </script>
       `;
      html = html.replace("</body>", `${hmrScript}</body>`);
      return new Response(html, { headers: { "Content-Type": "text/html" } });
    }

    let filePath = `.${path}`;

    // Check if file exists, try adding .ts extension if not
    let file = Bun.file(filePath);
    if (!(await file.exists())) {
      // Check if it's a directory
      try {
        const stats = await import("node:fs/promises").then(m => m.stat(filePath));
        if (stats.isDirectory()) {
          // Try index.ts
          let tsPath = `${filePath}/index.ts`;
          let tsFile = Bun.file(tsPath);
          if (await tsFile.exists()) {
            filePath = tsPath;
            file = tsFile;
            path = `${path}/index.ts`;
          } else {
            // Try folder name match (e.g. elements/elements.ts)
            const dirname = filePath.split("/").pop();
            tsPath = `${filePath}/${dirname}.ts`;
            tsFile = Bun.file(tsPath);
            if (await tsFile.exists()) {
              filePath = tsPath;
              file = tsFile;
              path = `${path}/${dirname}.ts`;
            }
          }
        }
      } catch (e) {
        // Not a directory or stat failed, fall through to extension check
      }

      // If still not found, try with .ts extension (for extensionless imports)
      if (!(await file.exists())) {
        const tsPath = `${filePath}.ts`;
        const tsFile = Bun.file(tsPath);
        if (await tsFile.exists()) {
          filePath = tsPath;
          file = tsFile;
          path = `${path}.ts`;
        } else {
          // One last check: if it was a directory query that failed both index/named, 
          // and .ts didn't exist, we return 404
          return new Response("Not Found", { status: 404 });
        }
      }
    }

    // For TypeScript files, transpile to JavaScript
    if (path.endsWith(".ts")) {
      const transpiler = new Bun.Transpiler({
        loader: "ts",
      });

      const source = await file.text();
      const result = await transpiler.transform(source);

      return new Response(result, {
        headers: {
          "Content-Type": "application/javascript",
        },
      });
    }

    // Serve other files as-is
    return new Response(file);
  },
});

// Watch src directory for changes
watch("./src", { recursive: true }, (event, filename) => {
  console.log(`[HMR] Change detected in ${filename}`);
  server.publish("hmr", "reload");
});

console.log(`🚀 Dev server running at http://localhost:${server.port}`);
