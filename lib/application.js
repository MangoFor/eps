var http = require('http');
var finalhandler = require('finalhandler');
var methods = require('methods');
var app = exports = module.exports = {};
var Router = require('./router');
var View = require('./view');
var slice = Array.prototype.slice;

app.init = function init() {
	this.settings = {};
	this.engines = {};
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



app.set=function set(setting,val){
	if(arguments.length == 1){
		return this.settings[setting];
	}
	this.settings[setting] = val;
	
	return this;
}

app.engine = function engine(engine,fn){
	if (typeof fn !== 'function') {
		throw new Error('app.engine require a function as engine');
	}

	this.engines[engine] = fn;

	return this;
}


app.render = function render(viewName,option,callback){
	var done = callback;
	var opt = option || {};
	
	if(typeof opt == 'function'){
		done=opt;
	}
	
	var view = new View(viewName,{
		defaultEngine:this.set('view engine'),
		root:this.set('views'),
		engines:this.engines
	});
	
	if(!view.path){
		throw new Error('can\' find view in '+viewName);
	}
	view.render(opt,done);
}

function logerror(err) {
  console.error(err.stack || err.toString())
}

