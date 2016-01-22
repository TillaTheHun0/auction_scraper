var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config')

var app = express();

app.use(bodyParser.urlencoded({ extended: true })); // get information from html forms
app.use(bodyParser.json());
app.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "http://localhost:8100");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
	next();
})

config.entryPoints.forEach(function(entryPoint){
    var cur = require('app/'+ entryPoint + '/parser');
    app.use('/api/'+ cur.node, require('app/'+ entryPoint + '/router'));
})
//later auction lists here

//error handler
app.use(require("app/errors/notFound"));

module.exports = app;