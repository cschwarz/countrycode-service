var express = require('express');
var compress = require('compression');

var app = express();
var port = process.env.PORT || 3000;

app.use(compress());

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});

app.use('/api/1', require('./routes/v1'));

app.listen(port);
