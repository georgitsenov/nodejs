var express = require('express');
var session = require('express-session');
var mysql = require('mysql');
var path = require('path');

var connection = require('./db');

var app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get('/', function(request, response) {
	response.send("POSTS");
});

app.get('/admin', function(request, response) {
    if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.username + '!');
    } else {
		response.sendFile(path.join(__dirname, 'admin.html'));
    }   
    //response.end();
});

app.post('/admin', function(request, response) {
	var email = request.body.email;
	var password = request.body.password;
	if (email && password) {
		connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			if (results.length && results.length > 0) {
				request.session.loggedin = true;
				request.session.email = email;
				response.redirect('/admin');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.listen(3000);
