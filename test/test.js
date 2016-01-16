var expect = require('expect.js');
var request = require('supertest');
var express = require('../index.js');


describe('application', function() {
  describe('use', function() {

    var app = express();    
    app.use('/user',function(req,res){
        res.end('/user')
    })
    app.use('/index',function(req,res){
        res.end('/index')
    })

    it('app.use can add new route', function(done){
    	request(app)
    	.get('/user')
    	.expect(200,'/user',done);
	})

    it('app.use will match prefix path', function(done){        
         request(app)
        .get('/user/kkk')
        .expect(200,'/user',done);
    })
  })
})
