
var http = require('http');


var app = exports = module.exports = {};
var Router = require('./router');

app.init = function init() {
	//
	if(!this._router){
		this._router = new  Router();	
	}

}

app.listen = function listen() {
	var server = http.createSever(this);
	server.listen.apply(server, arguments);
}


app.handle = function handle(req,res) {
	this._router(req,res);
}

app.use = function use(path,fn){
	this._router.use(path,fn);
}


