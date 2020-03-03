var router = require('express').Router();
var appRoot = require('app-root-path');
var connection = require(appRoot + '/db');

router.get('/', function(request, response) {
    if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.email + '!');
		response.end();
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

module.exports = router;
