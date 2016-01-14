var expect = require('expect.js');
var request = require('supertest');
var express = require('../index.js');


describe('app', function(){
  describe('handle', function(){
    it('app.handle should recieve all request', function(done){
    	var app = express();

    	request(app)
    	.get('/')
    	.expect(200,'yes',done);
		})
	})
})
