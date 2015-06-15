// 모듈을 추출합니다.
var express = require('express');

// 서버를 생성합니다.
var app = express();

// 미들웨어를 생성합니다.
app.get('/', function (req, res) {
	// 기본적인 기능 테스트
	// res.send('Hello Node.js and Express!');

	// 출력 테스트
	// var output = [];
	// for (var i = 0; i < 3; i++) {
	// 	output.push({
	// 		count: i,
	// 		name: 'name - ' + i
	// 	})
	// }
	// res.send(output);

	// 요청 헤더의 속성 추출
	var agent = req.header('User-Agent');

	// console.log(req.headers);
	// console.log(agent);

	res.send(agent);
});

console.log("Web application opened");
app.listen(process.env.PORT);
