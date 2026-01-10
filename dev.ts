/**
 * Bun Dev Server
 * Serves HTML and compiles TypeScript on the fly
 */

const server = Bun.serve({
  port: 4000,

  async fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;

    // Serve index.html for root
    if (path === "/") {
      path = "/index.html";
    }

    let filePath = `.${path}`;

    // Check if file exists, try adding .ts extension if not
    let file = Bun.file(filePath);
    if (!(await file.exists())) {
      // Try with .ts extension (for extensionless imports)
      const tsPath = `${filePath}.ts`;
      const tsFile = Bun.file(tsPath);
      if (await tsFile.exists()) {
        filePath = tsPath;
        file = tsFile;
        path = `${path}.ts`;
      } else {
        return new Response("Not Found", { status: 404 });
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

console.log(`🚀 Dev server running at http://localhost:${server.port}`);
