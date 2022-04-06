const http = require("http");
const url = require("url");
const fs = require("fs");

http.createServer(function(req, res) {
  //"parse" is deprecated
  const site = url.parse(req.url, true);
  const file = "." + site.pathname;
  //run stylesheet
  if (site.pathname == "/style.css") {
    fs.readFile("style.css", function(err, data) {
      if (err) {
        console.warn(err);
      } else {
        res.writeHead(200, {"Content-Type": "text/css"});
        res.end(data);
      }
    });
  };
  //run index
  if (site.pathname == "/") {
    fs.readFile("index.html", function(err, data) {
      if (err) {
        console.warn(err);
      } else {
        console.log("Running...");
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(data);
        return res.end();
      }
    })
  };
  //run everything else
  fs.readFile(file, function(err, data) {
    if (err) {
      //run custom 404
      fs.readFile("404.html", (err, content) => {
        if (err) {
          console.warn(err);
        }
        console.log("404...");
        res.writeHead(404, {"Content-Type": "text/html"});
        return res.end(content);
      })
    } else {
      console.log("Running...");
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(data);
      return res.end();
    }
  });
}).listen(8080);
