var http = require('http');
var finalhandler = require('finalhandler');
var methods = require('methods');
var app = exports = module.exports = {};
var Router = require('./router');
var slice = Array.prototype.slice;

app.init = function init() {
	//
	if(!this._router){
		this._router = new  Router();	
	}

}

app.listen = function listen() {
	var server = http.createServer(this);
	server.listen.apply(server, arguments);
	console.log('server is listening on port:'+arguments[0]);
}


app.handle = function handle(req,res,callback) {
	var done = callback || finalhandler(req,res,{
		onerror: logerror
	})

	this._router.handle(req,res,done);
}

app.use = function use(path,fn){
	this._router.use(path,fn);
	return this;
}

methods.forEach(function(method){
	app[method] = function(path){
		var route = this._router.route(path);
		route[method].apply(route,slice.call(arguments,1));
		return this;
	}
})

function logerror(err) {
  console.error(err.stack || err.toString())
}

