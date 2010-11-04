var http = require("http"),
    static = require('node-static'),
    selective = require('./lib/node-http-proxy-selective');

var file = new static.Server('./demofiles');

http.createServer(function(req, res) {
  req.addListener('end', function() {
    file.serve(req, res);
  });
}).listen(8000);

selective.createServer({
  filter: {
    "192.168.24.31:8000": {
      style: "css"
    }
  },
  basepath: "replaces"
}).listen(8080);