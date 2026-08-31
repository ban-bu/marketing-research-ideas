const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;
const root = __dirname;

const routes = new Map([
  ["/", "index.html"],
  ["/idea-1", "IDEA1.html"],
  ["/idea-2", "IDEA2.html"],
  ["/secondary-data", "Potential Ideas Using Secondary Data.html"],
  ["/IDEA1.html", "IDEA1.html"],
  ["/IDEA2.html", "IDEA2.html"],
  ["/Potential%20Ideas%20Using%20Secondary%20Data.html", "Potential Ideas Using Secondary Data.html"]
]);

const server = http.createServer((request, response) => {
  const requestPath = new URL(request.url, `http://${request.headers.host}`).pathname;
  const fileName = routes.get(requestPath);

  if (!fileName) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Page not found");
    return;
  }

  fs.readFile(path.join(root, fileName), (error, content) => {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Unable to load this page");
      return;
    }

    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300"
    });
    response.end(content);
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Site listening on port ${port}`);
});
