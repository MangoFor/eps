var expect = require('expect.js');
var request = require('supertest');
var express = require('../index.js');
var ejs = require('ejs');

describe('application', function() {
  describe('render', function() {

    it('app.render can work well', function(done){
      var app = express();
      var fs = require('fs');
      var option={
        users: [
          { name: 'tj' },
          { name: 'mape' },
          { name: 'guillermo' },
          { name: 'mango' }
        ]
      }

      
      app.set('views','./test/view');
      app.set('view engine','ejs');

      var testhtml = fs.readFileSync('./test/view/index.ejs');

      app.render('index',option,function(err,text) {
      
        expect(err).to.not.be.ok();
        expect(text).to.be(ejs.render(testhtml.toString(),option));
        done();
      })
    })

  })
})
