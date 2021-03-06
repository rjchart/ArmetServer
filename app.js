// 모듈을 추출합니다.
// var azure = require('azure');
var azure = require('azure-storage');
var multiparty = require('multiparty');
var fs = require('fs');
var ejs = require('ejs');
var http = require('http');
var express = require('express');
var util = require('util');
var PORT = process.env.PORT || 27372;
var blobName = "testBlobName";
var containerName = "test";
// var conn_str = "Driver={SQL Server Native Client 10.0};Server=tcp:gys5qn81ol.database.windows.net,1433;Database=armetDB;Uid=armet;Pwd=Pinkrocket1234;Encrypt=yes;Connection Timeout=30;";

var startDate = new Date();
var expiryDate = new Date(startDate);

var app = express();

app.use(express.cookieParser());
// app.use(express.limit('10mb'));
// app.use(express.bodyParser({ uploadDir: __dirname + 'multipart'}));
app.use(express.bodyParser());
app.use(app.router);

var accessKey = 'UzC27GHWe/VjM/yq4jssToMfry6QsjOx4ngE8RANRXLXd9j9tuIO2yIm4puYwVmf5hDQHzuiA2/N70M++br6QA==';
var storageAccount = 'armet';

app.get('/', function(request, response) {
	var tableService = azure.createTableService(storageAccount, accessKey);

	tableService.createTableIfNotExists('products', function(error, result, res){
	    if(!error){
	        // Table exists or created
	    }
	});

	fs.readFile('list.html', 'utf8', function (error, data) {
		var query = new azure.TableQuery()
		// .top(5)
		.where('PartitionKey eq ?', 'data');

		// 데이터베이스 쿼리를 실행합니다.
		tableService.queryEntities('products', query, null, function entitiesQueried(error, result) {
			if (!error) {
				var testString = JSON.stringify(result.entries);
				var entries = JSON.parse(testString);
				// response.send(newTest[0].name._);
				var users = ['geddy', 'neil', 'alex'];
				response.send(ejs.render(data, 
					{data: entries,
					 users: users},
					{delimiter: '%'}
				));

				 
				// // Just one template 
				// var ejsString = ejs.render('<?= users.join(" | "); ?>', {users: users}, {delimiter: '?'});
				// response.send("ajs done");

				// response.send(data.toString());
			}
		});

	});
	// response.send("Hello");
});

app.get('/delete/:id', function(request, response) {
	// 데이터베이스 쿼리를 실행합니다.
	var tableService = azure.createTableService(storageAccount, accessKey);

	tableService.createTableIfNotExists('products', function(error, result, res){
	    if(!error){
	        // Table exists or created
	    }
	});

	var id = request.param('id');

	var task = { 
	  PartitionKey: {'_':'data'},
	  RowKey: {'_': id}
	};

	tableService.deleteEntity('products', task, function(error, res){
		if(!error) {
		// Entity deleted
			response.redirect('/');
		}
	});

});

app.get('/insert', function (request, response) {
	// 파일을 읽습니다.
	fs.readFile('insert.html', 'utf8', function (error, data) {
		// 응답합니다.
		response.send(data);
	});
});

app.post('/insert', function (request, response) {
	// 변수를 선언합니다.
	var body = request.body;
	var tableService = azure.createTableService(storageAccount, accessKey);

	var entGen = azure.TableUtilities.entityGenerator;
	var entity = {
		PartitionKey: entGen.String(body.PartitionKey),
		RowKey: entGen.String(body.RowKey),
		id: entGen.Int32(body.id),
		name: entGen.String(body.name),
		modelnumber: entGen.String(body.modelnumber),
		series: entGen.String(body.series)
	};

	// 데이터베이스에 entity를 추가합니다.
	tableService.insertEntity('products', entity, function(error, result, res) {
		if (!error) {
			response.redirect('/');
		}
	});
});

app.get('/edit/:id', function (request, response) {
	var tableService = azure.createTableService(storageAccount, accessKey);
	var id = request.param('id');


	// 파일을 읽습니다.
	fs.readFile('edit.html', 'utf8', function (error, data) {
		var query = new azure.TableQuery()
		.top(1)
		.where('PartitionKey eq ? and RowKey eq ?', 'data', id);

		// 데이터베이스 쿼리를 실행합니다.
		tableService.queryEntities('products', query, null, function entitiesQueried(error, result) {
			if (!error) {
				var testString = JSON.stringify(result.entries);
				var entries = JSON.parse(testString);
				// response.send(newTest[0].name._);
				response.send(ejs.render(data, 
					{data: entries[0]}
				));
			}
		});
	});
});

app.post('/edit/:id', function (request, response) {
	// 변수를 선언합니다.
	var body = request.body;
	var tableService = azure.createTableService(storageAccount, accessKey);

	var entGen = azure.TableUtilities.entityGenerator;
	var entity = {
		PartitionKey: entGen.String(body.PartitionKey),
		RowKey: entGen.String(body.RowKey),
		id: entGen.Int32(body.id),
		name: entGen.String(body.name),
		modelnumber: entGen.String(body.modelnumber),
		series: entGen.String(body.series)
	};

	// 데이터베이스에 entity를 추가합니다.
	tableService.updateEntity('products', entity, function(error, result, res) {
		if (!error) {
			response.redirect('/');
		}
	});
});

// app.get('/user', function(request, response) {
// 	response.send(DummyDB.get());
// });

// app.get('/user/:id', function(request, response) {
// 	response.send(DummyDB.get(request.param('id')));
// });

// app.post('/user', function(request, response) {
// 	// 변수를 선언합니다.
// 	var name = request.param('name');
// 	var region = request.param('region');

// 	// 유효성을 검사합니다.
// 	if (name && region) {
// 		DummyDB.insert({
// 			name: name,
// 			region: region
// 		});
// 		response.send(DummyDB.get());
// 	}
// 	else {
// 		throw new Error('error');
// 	}

// 	// response.send("OK Post");
// });

// app.put('/user/:id', function(request, response) {
// 	// 변수를 선언합니다.
// 	var id = request.param('id');
// 	var name = request.param('name');
// 	var region = request.param('region');

// 	// // 데이터베이스를 수정합니다.
// 	var item = DummyDB.get(id);
// 	if (!item)
// 		response.send('no data');
// 	else {
// 		item.name = name || item.name;
// 		item.region = region || item.region;

// 		// // 응답합니다.
// 		response.send(item);
// 	}
// 	// response.send('put OK');
// });

// app.del('/user/:id', function(request, response) {
// 	response.send(DummyDB.remove(request.param('id')));
// });


app.get('/table', function (req, res) {
	var tableService = azure.createTableService(storageAccount, accessKey);

	tableService.createTableIfNotExists('mytable', function(error, result, res){
	    if(!error){
	        // Table exists or created
	    }
	});

	var entGen = azure.TableUtilities.entityGenerator;
	var entity = {
	  PartitionKey: entGen.String('part2'),
	  RowKey: entGen.String('row1'),
	  boolValueTrue: entGen.Boolean(true),
	  boolValueFalse: entGen.Boolean(false),
	  intValue: entGen.Int32(42),
	  dateValue: entGen.DateTime(new Date(Date.UTC(2011, 10, 25))),
	  complexDateValue: entGen.DateTime(new Date(Date.UTC(2013, 02, 16, 01, 46, 20)))
	};

	var resultString = entity.Partition;
	tableService.insertEntity('mytable', entity, function(error, result, response) {
	  if (!error) {
	  	resultString = result.entries;
	    // result contains the ETag for the new entity
	  }
	  // console.log("etag: " + result);
	});

	// var sharedAccessPolicy = {
	//   AccessPolicy: {
	//     Permissions: azure.BlobUtilities.SharedAccessPermissions.READ,
	//     Start: startDate,
	//     Expiry: expiryDate
	//   },
	// };
	 
	// var token = blobService.generateSharedAccessSignature(containerName, blobName, sharedAccessPolicy);
	// var sasUrl = blobService.getUrl(containerName, blobName, token);

	res.send("Make Table:" + resultString);
    // res.send(
    //  	'<form action="/upload" enctype="multipart/form-data" method="post">'+
    //   	'<input type="text" name="title"><br>'+
    //   	'<input type="file" name="upload"><br>'+
    //   	'<input type="submit" value="Upload">'+
    //   	'</form>'
    // );
});

app.get('/upload', function (req, res) {
	var blobService = azure.createBlobService(storageAccount, accessKey);
	var sharedAccessPolicy = {
	  AccessPolicy: {
	    Permissions: azure.BlobUtilities.SharedAccessPermissions.READ,
	    Start: startDate,
	    Expiry: expiryDate
	  },
	};
	 
	var token = blobService.generateSharedAccessSignature(containerName, blobName, sharedAccessPolicy);
	var sasUrl = blobService.getUrl(containerName, blobName, token);

    res.send(
    	'<h1>' + sasUrl + '</h1>' +
     	'<form action="/upload" enctype="multipart/form-data" method="post">'+
      	'<input type="text" name="title"><br>'+
      	'<input type="file" name="upload"><br>'+
      	'<input type="submit" value="Upload">'+
      	'</form>'
    );
});

app.post('/upload', function (req, res) {
	var blobService = azure.createBlobService(storageAccount, accessKey);
	var form = new multiparty.Form();
    form.on('part', function(part) {
	    if (!part.filename) return;
		
		var size = part.byteCount;
		var name = part.filename;
		var container = 'test';
		
		blobService.createBlockBlobFromStream(container, name, part, size, function(error) {
			if (error) {
				// error handling
			}
		});
	});
	form.parse(req);
	
    // res.writeHead(200, {'content-type': 'text/html'});
	res.send('<h1>File uploaded successfully</h1>');
});

console.log("Web application opened");
app.listen(PORT);