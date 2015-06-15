var http = require('http');
// 모듈을 추출합니다.
var express = require('express');

// 서버를 생성합니다.
var app = express();


// 미들웨어를 생성합니다.
app.use(function (req, res, next) {
	// 기본적인 기능 테스트
	res.send('Hello Node.js and Express test static !' + __dirname);
// 	next();
// 	// 출력 테스트
// 	// var output = [];
// 	// for (var i = 0; i < 3; i++) {
// 	// 	output.push({
// 	// 		count: i,
// 	// 		name: 'name - ' + i
// 	// 	})
// 	// }
// 	// res.send(output);

// 	// 요청 헤더의 속성 추출
// 	// var agent = req.header('User-Agent');
// 	// // 브라우저 구분
// 	// if (agent.toLowerCase().match(/safari/)) {
// 	// 	res.send('<h1>Hello Safari..! </h1>');
// 	// }
// 	// else {
// 	// 	res.send('<h1>Hello Express..! </h1>');
// 	// }

// 	// 요청 매개 변수 출력
// 	// var name = req.param('name');
// 	// var region = req.param('region');
// 	// res.send('<h1>' + name + '-' + region + '!!</h1>');
});

// app.use(express.logger());
// app.use (express.static(__dirname + '/public'));


console.log("Web application opened");
// app.listen(process.env.PORT);
http.createServer(app).listen(52273,function() {

})
