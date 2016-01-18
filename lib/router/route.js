var methods = require('methods');
var Layer = require('./layer');


module.exports = Route;

function Route(path){
	this.path = path;
	this.methods = {};
	this.stack = [];
}



methods.forEach(function(method){
	Route.prototype[method]=function(){
		var fn = arguments[0];
		if(typeof fn != 'function'){
			throw new Error('Route.'+method+'require a callback function');
		}

		layer = new Layer('/',{},fn);
		layer.method = method;
		
		this.methods[method]=true;

		this.stack.push(layer);
	}
})

Route.prototype.dispatch = function dispatch(req,res,done) {
	var stack = this.stack;
	var idx = 0;
	next();

	function next(err) {
		var layer = stack[idx++];

		if(!layer){
			return done(err);
		}

		var method = req.method.toLowerCase();
		if(layer.method && layer.method !== method) {
			console.log(layer.method);
			return next(err);
		}

		layer.handle_request(req,res,next);
	}
}