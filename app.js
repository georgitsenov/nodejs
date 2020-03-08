var express = require('express');
var session = require('express-session');
var mysql = require('mysql');
var path = require('path');
var rateLimit = require("express-rate-limit");

var app = express();

var adminLimiter = rateLimit({
	max: 5,
	windowMs: 60000,
	message: 'Too many requests, please try again later.',
	statusCode: 429,
	headers: true

});

app.use(session({
	secret: ';=fjGnwsV`2+#=9Y',
	resave: true,
	saveUninitialized: true
}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/admin', adminLimiter)

app.use('/', require('./routes'));
app.use('/admin', require('./routes/admin'));

app.listen(3000);
