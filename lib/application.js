
var http = require('http');

var app = exports = module.exports = {};


app.init = function init() {
	//
}

app.listen = function listen() {
	var server = http.createSever(this);
	server.listen.apply(server, arguments);
}


app.handle = function handle(req,res) {
	res.end('yes')
}
