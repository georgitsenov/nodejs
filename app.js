var path = require('path');
var express = require('express');
var session = require('express-session');
var rateLimit = require("express-rate-limit");
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var app = express();

mongoose.connect("mongodb://localhost:27017/nodejsBlogdb", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

app.set('views', './views').set('view engine', 'pug');
app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session({
	secret: ';=fjGnwsV`2+#=9Y',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var adminLimiter = rateLimit({
    max: 10, 
    windowMs: 60000,
    message: 'Too many requests, please try again later.',
    statusCode: 429,
    headers: true

});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/');
}

app.use('/', require('./routes'));
app.use(['/admin', '/admin/*'], adminLimiter, ensureAuthenticated, require('./routes/admin'));

app.listen(3000);
