const http = require("http");
const url = require("url");
const fs = require("fs");

http.createServer(function(req, res) {
  const site = url.parse(req.url, true);
  const file = "." + site.pathname;
  fs.readFile(file, function(err, data) {
    if (err) {
      console.log(site);
      res.writeHead(404, {"Content-Type": "text/html"});
      return res.end("404 Not Found");
    }
    console.log(site);
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(data);
    return res.end();
  });
}).listen(8080);
