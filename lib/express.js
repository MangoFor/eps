var proto = require('./application');
var EventEmitter = require('events').EventEmitter;
var mixin = require('merge-descriptors');
var request = require('supertest');

function createApplication(){
	function app(req,res){
			app.handle(req,res);
	}
	mixin(app,proto,false);
	
	app.init();

	return app;
}



module.exports = createApplication;