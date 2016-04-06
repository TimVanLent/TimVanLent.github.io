var express = require('express');
var	sass    = require('node-sass'); // We're adding the node-sass module
var path    = require('path'); 
var sassMiddleware = require('node-sass-middleware');

var app = express();


app.set('views', './src/views');

app.use(
   sassMiddleware({
       src: './sass', 
       dest: './',
       debug: true,       
   })
);  

app.use(express.static('./'));

var server = app.listen(3000, function () {
	console.log('Example app listening on port: ' + server.address().port);
});

