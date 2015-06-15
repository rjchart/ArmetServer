var express = require('express');
var app = express();

app.get('/', function (req, res) {
	res.send('Hello Node.js and Express!');
	var output = [];
	for (var i = 0; i < 3; i++) {
		output.push({
			count: i,
			name: 'name - ' + i
		})
	}
	respond.send(output);
});

console.log("Web application opened");
app.listen(process.env.PORT);
