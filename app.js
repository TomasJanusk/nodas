const fs = require("fs");
const http = require("http");
const url = require("url");
const syHello = require("./modules/syHello");
const search = require("./modules/search");
let products = fs.readFileSync("./data/products.json", "utf-8"); //skaitom faila
products = JSON.parse(products);

//Create server

const server = http.createServer((req, res) => {
  //res.writeHead(200, { "Content-Type": "products/html" });
  //res.end("<h1>This is home page</h1>");
  //res.writeHead(200, { "Content-Type": "application/json" });
  //res.end(JSON.stringify(products));

  const { pathname, query } = url.parse(req.url, true);

  //   console.log("Pathname: ", pathname);
  //   console.log("Query: ", query);
  switch (pathname) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h1>This is home page</h1>");
      break;
    case "/api/products":
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(products));
      break;
    case "/api/product":
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(products[query.id]));
      break;
    case "/api/product/search":
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(search(products, query.name)));
      break;

    default:
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h1>Page not found</h1>");
     break;
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server listening om 8000 port");
});
