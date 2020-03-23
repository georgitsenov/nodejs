var router = require('express').Router();
var appRoot = require('app-root-path');
var User = require(appRoot + '/models/user');

var posts = require('./posts');

function validatePassword(password) {
	var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

	if (password.match(paswd)) { 
		return true;
	} else { 
		return false;
	}
}


router.get('/', function(request, response) {
    if (request.session.loggedIn) {
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
        User.findOne({email: email, password: password})
            .then( () => {
                request.session.loggedIn = true;
                request.session.email = email;
                response.redirect('back');
            })
            .catch((error) => {
                response.send('Incorrect Username and/or Password!');
            })
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


router.post('/register', function(request, response, next) {
	var first_name = request.body.fname;
	var last_name = request.body.lname;
	var email = request.body.email;
	var password = request.body.password;

    if (!validatePassword(password)) {
        response.send('Password too weak!');
		response.end();
		return next();
    }

	User.create({ firstName: first_name, lastName: last_name, email: email, password: password})
	.then( () => {
		response.redirect('/admin')})
	.catch( (error) => {
		if (error) {
			response.send('Unable to add user to database')
        }});
});


router.use('/posts', posts);


module.exports = router;
