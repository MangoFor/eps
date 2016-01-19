var expect = require('expect.js');
var request = require('supertest');
var express = require('../index.js');
var ejs = require('ejs');

describe('application', function() {
  describe('set', function() {
    it('app.set will save what we set', function() {       
      var app = express();    
      app.set('views','./public');
      expect(app.set('views')).to.be('./public');
    })
    it('app.engine will add fn into app.engines', function(){
      var app = express();
      
      app.engine('ejs',ejs.render);
      expect(app.engines['ejs']).to.be(ejs.render);
    })
  })
  describe('engine', function() {
    it('app.engine will add fn into app.engines', function(){
      var app = express();
      
      app.engine('ejs',ejs.render);
      expect(app.engines['ejs']).to.be(ejs.render);
    })
  })
})
