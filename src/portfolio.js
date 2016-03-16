var express = require('express');
var app = express();

app.use(express.static('./src/views'));

app.set('views', './src/views');

var server = app.listen(3000, function () {
	console.log('Example app listening on port: ' + server.address().port);
});
