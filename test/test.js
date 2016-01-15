var expect = require('expect.js');
var request = require('supertest');
var express = require('../index.js');


describe('application', function() {
  describe('use', function() {
    it('app.use can add new route', function(done){
    	var app = express();
    	app.use('/user',function(req,res){
    		res.end('/user')
    	})
    	app.use('/index',function(req,res){
    		res.end('/index')
    	})

    	request(app)
    	.get('/user')
    	.expect(200,'/user',done);

    	request(app)
    	.get('/index')
    	.expect(200,'/user',done);
		})
	})
})
