var path = require('path');
var fs = require('fs');

var extname = path.extname;
var dirname = path.dirname;
var basename = path.basename;basename;
var resolve = path.resolve;

module.exports = View;


function View(viewName,option) {
	var ext = extname(viewName);

	this.engines = option.engines;
	this.root = option.root;

	//确认引擎类型
	if(!ext && !option.defaultEngine){
		throw new Error('app.render need explicit engine');
	}
	if(!ext){
		ext = option.defaultEngine[0] != '.'?'.'+option.defaultEngine:
			option.defaultEngine;
	}
	this.ext = ext;

	//加载引擎类型
	if(!this.engines[ext]){
		this.engines[ext] = require(this.ext.substr(1)).__express;
	}

	this.engine = this.engines[ext];

	this.path = this.lookup(viewName);
}


View.prototype.lookup = function lookup(viewName) {

	var filePath = resolve(this.root,viewName);
	var roots = [].concat(this.root);

	for(var i = 0; i < roots.length; ++i) {
		var stat = trySate(filePath);

		if(stat && stat.isFile())	{
			return filePath;
		}
	}

	filePath = resolve(this.root,viewName+this.ext);
	for(var i = 0; i < roots.length; ++i) {
		var stat = trySate(filePath);

		if(stat && stat.isFile())	{
			return filePath;
		}
	}
}


function trySate(path){
	try{
		return fs.statSync(path);
	}catch(err){
		return undefined;
	}
}


View.prototype.render = function render(opt,callback){
	
	this.engine(this.path,opt,callback);
}

