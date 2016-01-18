var expect = require('expect.js');
var request = require('supertest');
var express = require('../index.js');


describe('application', function() {
  describe('methods', function() {

    var app = express();    
    app.get('/user',function(req,res){
        res.end('/user')
    })
    app.use(function(req,res){
        res.end('/404')
    })

    it('app.get will match same path', function(done){        
         request(app)
        .get('/user')
        .expect(200,'/user',done);
    })
    it('app.get will not match prefix path', function(done){        
         request(app)
        .get('/user/kkk')
        .expect(200,'/404',done);
    })
  })
})
