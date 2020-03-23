var path = require('path');
var express = require('express');
var session = require('express-session');
var rateLimit = require("express-rate-limit");
var mongoose = require('mongoose');

var app = express();
mongoose.connect("mongodb://localhost:27017/nodejsBlogdb", { useNewUrlParser: true, useUnifiedTopology: true });

app.set('views', './views').set('view engine', 'pug');
app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session({
	secret: ';=fjGnwsV`2+#=9Y',
	resave: true,
	saveUninitialized: true
}));

var adminLimiter = rateLimit({
    max: 10, 
    windowMs: 60000,
    message: 'Too many requests, please try again later.',
    statusCode: 429,
    headers: true

});

app.use('/', require('./routes'));
app.use('/admin', adminLimiter, require('./routes/admin'));

app.listen(3000);
