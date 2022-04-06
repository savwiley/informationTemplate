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


/**
 * ERROR
 * node: _http_outgoing:722
 * https://stackoverflow.com/questions/59148769/post-using-request-promise-module-in-node-js-and-getting-http-outgoing-js618-th
 * 
 * TypeError [ERR_INVALID_ARG_TYPE]: The "chunk" argument must be of type string or an instance of Buffer or Uint8Array. Received undefined
 */