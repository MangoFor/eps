var express = require('../index.js');


var app = express();

app.get('/user',function(req,res) {
    res.end('/user')
})
app.get('/',function(req,res) {
    res.end('/////')
})

app.use(function(req,res) {
    res.end('/404')
})

app.listen(8000);
