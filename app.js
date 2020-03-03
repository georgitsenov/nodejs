var express = require('express');
var session = require('express-session');
var mysql = require('mysql');
var path = require('path');

var app = express();

app.use(session({
	secret: ';=fjGnwsV`2+#=9Y',
	resave: true,
	saveUninitialized: true
}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', require('./routes'));
app.use('/admin', require('./routes/admin'));

app.listen(3000);
