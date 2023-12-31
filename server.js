var request = require('request');
var cheerio = require('cheerio');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var express     = require('express');
var app         = express();
app.use(express.static(__dirname));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
var port = process.env.PORT || 8080; 
app.use(express.static(__dirname + '/public'));

var patentLink = 'http://www.freepatentsonline.com/';




app.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

app.post('/patFetch', function(req, res) {
	var url = patentLink + req.body.num + '.html';
	request(url, function(error, response, html) {
		if(!error) {
			res.json({html: html});
		
		}
	});
	
});

app.post('/writeFile', function(req, res) {
	fs.writeFile("./test.txt", req.body.file, function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("File saved");
			res.sendFile(path.join(__dirname, 'test.txt'));			
		}
	});
	
	
});

app.listen(port);
console.log('Server started on port: ' + port);


