// var http = require('http');
// var express = require('express');
// 
// var port = process.env.PORT || 1337;
// http.createServer(function(req, res) {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello Azure World!! Error?\n');
// }).listen(port);

var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});