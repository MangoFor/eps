
var url = require('url');

var proto = module.exports = exports = function(){
	function router(req,res){
		router.handle(req,res);
	}

	router.__proto__ = proto;
	router.stack = [];

	return router;
}


proto.use = function use(path,fn){
	this.stack.push({
		path:path,
		fn:fn
	})
}

proto.handle = function handle(req,res) {
	var idx = 0;
	var _this = this;
	next();

	function next(){
		var layer = _this.stack[idx++];
		if(!layer){
			return;
		}
		if(layer.path == url.parse(req.url).pathname){
			layer.fn(req,res);
		}
	}
}
