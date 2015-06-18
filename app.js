// 모듈을 추출합니다.
// var azure = require('azure');
var azure = require('azure-storage');
var multiparty = require('multiparty');
var fs = require('fs');
var http = require('http');
var express = require('express');
var util = require('util');

var accessKey = 'UzC27GHWe/VjM/yq4jssToMfry6QsjOx4ngE8RANRXLXd9j9tuIO2yIm4puYwVmf5hDQHzuiA2/N70M++br6QA==';
var storageAccount = 'armet';
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var limit = require('limit');

// var blobSvc = azure.createBlobService();
// blobSvc.createContainerIfNotExists('mycontainer', {publicAccessLevel: 'blob'}, function (error, result, response) {
// 	if (!error) {

// 	}
// });

// 서버를 생성합니다.
var app = express();

app.use(express.cookieParser());
// app.use(express.limit('10mb'));
// app.use(express.bodyParser({ uploadDir: __dirname + 'multipart'}));
// app.use(express.bodyParser());
app.use(app.router);

// 그림 읽어들임 관련 함수
// app.use (express.static(__dirname + '/public'));

app.get('/', function(request, response) {
	// if (request.cookies.auth) {
	// 	response.send('<h1>Login Success</h1>');
	// }
	// else {
	// 	response.redirect('/login');
	// }

	fs.readFile('HTMLPage.html', function(error, data) {
		response.send(data.toString());
	});
});

app.post('/', function(request, response) {
	console.log(request.body);
	console.log(request.files);

	response.redirect('/');
});

app.get('/upload', function (req, res) {
    res.send(
   	'<h1>title</h1>'+
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
    );
});

app.post('/upload', function (req, res) {
    var blobService = azure.createBlobService(storageAccount, accessKey);
    var form = new multiparty.Form();

	form.on('error', function(err) {
		res.send('Error parsing form: ' + err.stack);
	});

	form.on ('part', function(part) {
		// if (part.filename) {
		// 	var size = part.byteCount - part.byteOffset;
		// 	var name = part.filename;

		// 	blobService.createBlockBlobFromStream('test', name, part, size, function (error) {
		// 		if (error) {
		// 			res.send({ Grrr: error});
		// 		}
		// 		else {
		// 			res.send("OK");
		// 		}
		// 	});
		// } else {
		// 	form.handlePart(part);
		// }
		res.send("part done");
	});

    // form.parse(req, function(err, fields, files) {
    // 	res.send(util.inspect({fields: fields, files: files}));
    // });

	// res.send('good');
});
 
// app.get('/login', function(request, response) {
// 	fs.readFile('login.html', function (error, data) {
// 		response.send(data.toString());
// 	})
// });

// app.post('/login', function(request, response) {
// 	var login = request.param('login');
// 	var password = request.param('password');

// 	console.log(login, password);
// 	console.log(request.body);

// 	if (login == 'rint' && password == '1234') {
// 		//로그인 성공
// 		response.cookie('auth', true);
// 		response.redirect('/');
// 	}
// 	else {
// 		//로그인 실패
// 		response.redirect('/login');
// 	}
// });

// app.get('/getCookie', function (request, response) {
// 	// 응답합니다.
// 	response.send(request.cookies);

// 	// var name = request.param('id');
// 	// response.send('<h1>' + name + ' Page</h1>');
// });

// app.get('/SetCookie', function(request, response) {
// 	response.cookie('string', 'cookie');
// 	response.cookie('json', {
// 		name: 'cookie',
// 		property: 'delicious'
// 	});

// 	response.redirect('/getCookie');
// })


// 미들웨어를 생성합니다.
// app.use('/', function (req, res, next) {
	// 기본적인 기능 테스트
	// res.send('Hello Node.js and Express test static !');

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
	// var agent = req.header('User-Agent');
	// // 브라우저 구분
	// if (agent.toLowerCase().match(/safari/)) {
	// 	res.send('<h1>Hello Safari..! </h1>');
	// }
	// else {
	// 	res.send('<h1>Hello Express..! </h1>');
	// }

	// 요청 매개 변수 출력
	// var name = req.param('name');
	// var region = req.param('region');
	// res.send('<h1>' + name + '-' + region + '!!</h1>');

	// 그림을 읽어들임
// 	res.writeHead(200, { 'Content-Type': 'text/html' });
// 	res.end('<img src="/Penguins.jpg" width="100%" />');

// });


// app.use(express.logger());


console.log("Web application opened");
app.listen(process.env.PORT);
