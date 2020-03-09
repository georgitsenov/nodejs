var router = require('express').Router();
var appRoot = require('app-root-path');
var connection = require(appRoot + '/db');

var posts = require('./posts');

router.get('/', function(request, response) {
    if (request.session.loggedin) {
    	response.sendFile(appRoot + '/admin-home.html', function(err) {
            if (err) {
                response.status(err.status).end();
            }
        }); 
    } else {
        response.sendFile(appRoot + '/admin.html', function(err) {
			if (err) {
				response.status(err.status).end();
			}
		});
    }   
});

router.post('/', function(request, response) {
    var email = request.body.email;
    var password = request.body.password;
    if (email && password) {
        connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(error, result, fields) {
            if (result.length && result.length > 0) {
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

router.get('/register', function(request, response) {
	response.sendFile(appRoot + '/admin-register.html', function (err) {
		if (err) {
			response.status(err.status).end();
		}
	});
});

router.post('/register', function(request, response) {
	var first_name = request.body.fname;
	var last_name = request.body.lname;
	var email = request.body.email;
	var password = request.body.password;

	connection.query('INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)', [first_name, last_name, email, password], function(error, result, fields) {
		if (error) {
			response.send('Unable to add user to database');
		}

		response.redirect('/admin');
	});
});

router.use('/posts', posts);

module.exports = router;
