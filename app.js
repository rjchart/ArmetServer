var http = require('http');
var express = require('express');
var port = process.env.PORT || 1337;
http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello Azure World!! Error?\n');
}).listen(port);