// 모듈을 추출합니다.
// var azure = require('azure');
var azure = require('azure-storage');
var multiparty = require('multiparty');
var fs = require('fs');
var http = require('http');
var express = require('express');
var util = require('util');
var PORT = process.env.PORT || 27372;
var blobName = "testBlobName";
var containerName = "test";

var startDate = new Date();
var expiryDate = new Date(startDate);

// blobService.createContainerIfNotExists('taskcontainer', {
//   publicAccessLevel: 'blob'
// }, function(error, result, response) {
//   if (!error) {
//     // if result = true, container was created.
//     // if result = false, container already existed.
//   }
// });

var accessKey = 'UzC27GHWe/VjM/yq4jssToMfry6QsjOx4ngE8RANRXLXd9j9tuIO2yIm4puYwVmf5hDQHzuiA2/N70M++br6QA==';
var storageAccount = 'armet';

var server = http.createServer(function(req, res) {
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

  if (req.url === '/') {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
    	'<h1>' + sasUrl + '</h1>' +
     	'<form action="/upload" enctype="multipart/form-data" method="post">'+
      	'<input type="text" name="title"><br>'+
      	'<input type="file" name="upload"><br>'+
      	'<input type="submit" value="Upload">'+
      	'</form>'
    );
  } else if (req.url === '/upload') {
    
	// var blobService = azure.createBlobService();
	// var form = new multiparty.Form();
    // form.on('part', function(part) {
	 //    if (!part.filename) return;
		
		// var size = part.byteCount;
		// var name = part.filename;
		// var container = 'test';
		
		// blobService.createBlockBlobFromStream(container, name, part, size, function(error) {
		// 	if (error) {
		// 		// error handling
		// 	}
		// });
	// });
	// form.parse(req);
	
    res.writeHead(200, {'content-type': 'text/html'});
	res.end('<h1>File uploaded successfully</h1>');
   }
});
server.listen(PORT, function() {
  console.info('listening on http://0.0.0.0:'+PORT+'/');
});