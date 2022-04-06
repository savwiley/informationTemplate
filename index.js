const http = require("http");
const url = require("url");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const site = url.parse(req.url, true);
  const file = "." + site.pathname;
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404, {"Content-Type": "text/html"});
      res.write(data);
      return res.end();
    }
    else {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(data);
      return res.end();
    }
  })
}).listen("8080");