var pathToRegexp = require('path-to-regexp');



module.exports = Layer;


function Layer(path,option,fn){
	if(!(this instanceof Layer)){
		return new Layer(path,option,fn);
	}

	this.regexp = pathToRegexp(path,[],option);
	this.handle = fn;
}


Layer.prototype.match = function match(path){
	return this.regexp.exec(path);
}


Layer.prototype.handle_request = function handle_rquest(req,res,next){
	try{
		this.handle(req,res,next);
	}catch(err){
		next(err);
	}
}