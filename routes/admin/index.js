var router = require('express').Router();
var passport = require('passport');
var appRoot = require('app-root-path');
var User = require(appRoot + '/models/user');

var posts = require('./posts');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


function validatePassword(password) {
	var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

	if (password.match(paswd)) { 
		return true;
	} else { 
		return false;
	}
}


router.get('/', function(request, response) {
    if (request.user) {
    	response.render('admin/home');
    } else {
        response.render('admin/index');
    }   
});


router.post('/', passport.authenticate('local', {failureRedirect: '/', failureFlash: true }), function(request, response) {
    response.redirect('/admin');
});


router.get('/register', function(request, response) {
	response.render('admin/register');
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

    User.register(new User({ email: email, firstName: first_name, lastName: last_name }), password, function (err, account) {
        if (err) {
            //response.render('admin/register');
            console.log('error while user register!', err);
            return next(err);
        }

        passport.authenticate('local')(request, response, function () {
            response.redirect('/admin');
        });
    });
});


router.get('/logout', function(request, response) {
    request.logout();
    response.redirect('/admin');
});


router.use('/posts', posts);


module.exports = router;
