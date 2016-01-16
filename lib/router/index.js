var url = require('url');
var methods = require('methods');
var Layer =require('./layer');

var proto = module.exports = exports = function(){
	function router(req,res){
		router.handle(req,res);
	}

	router.__proto__ = proto;
	router.stack = [];

	return router;
}


proto.use = function use(fn){
	//如果没有存入path，则默认是'/'
	var path='/';
	if(typeof fn != 'function'){
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
			done(layerError);
			return;
		}

		path =  getPathname(req);

		if(!path){
			done(layerError);
			return;
		}

		if(layer.match(path)) {
			layer.handle_request(req,res,next);
		}
	}
}


function getPathname(req){
	try{
		return url.parse(req.url).pathname	
	}catch(e){
		return undefined;
	}
}