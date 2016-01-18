var url = require('url');
var methods = require('methods');
var Layer =require('./layer');
var Route = require('./route');
var slice = Array.prototype.slice;

var proto = module.exports = exports = function(){
	function router(req,res){
		router.handle(req,res);
	}

	router.__proto__ = proto;
	router.stack = [];

	return router;
}


proto.use = function use(fn) {
	//如果没有存入path，则默认是'/'
	var path='/';
	if(typeof fn != 'function') {
		path = fn;
		fn=arguments[1];
	}

	if(typeof fn != 'function'){
		throw new TypeError('route.use require a middleware function');
	}

	var layer = Layer(path,{
		sensitive :false,
		strict :false,
		end:false
	},fn);

	this.stack.push(layer);
}

proto.handle = function handle(req, res, done) {
	var idx = 0;
	var _this = this;
	var stack = this.stack;
	var path;


	next();

	function next(layerError) {
		var layer = stack[idx++];

		if(!layer){
			return done(layerError);
		}

		path =  getPathname(req);

		if(!path){
			return done(layerError);;
		}

		if(!layer.match(path)) {
			return next(layerError);
		}

		
		
		if(layerError){
			layer.handle_error(layerError,req,res,next);
		}else{
			layer.handle_request(req,res,next);	
		}
		

	}
}

proto.route = function route(path){
	var route = new Route(path);
	layer = Layer(path,{
		sensitive :false,
		strict :false,
		end:true
	},route.dispatch.bind(route));

	layer.route = route;
	this.stack.push(layer);

	return route;
}

methods.forEach(function(method) {
	proto[method] = function(){
		var route = this.route(method);
		route[method].apply(route,slice.call(arguments,1));
	}
})



function getPathname(req){
	try{
		return url.parse(req.url).pathname	
	}catch(e){
		return undefined;
	}
}