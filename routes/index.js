var router = require('express').Router();
var appRoot = require('app-root-path');
var passport = require('passport');
var Post = require(appRoot + '/models').Post;
var User = require(appRoot + '/models').User;


passport.use(User.createStrategy({ passReqToCallback: true }));
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
    Post.find()
        .sort({'createdAt': 'desc'})
        .then( (result) => {
            response.render('index', { dataObject: result })
        });
    
});


router.get('/login', function(request, response) {
    if (request.user) {
        response.redirect('/admin')
    } else {
    
        response.render('login'); 
    }   
});


router.post('/login', passport.authenticate('local', {failureRedirect: '/login', failureFlash: true }), function(request, response) {
    response.redirect('/admin');
});


router.get('/register', function(request, response) {
    response.render('register');
});


router.post('/register', function(request, response, next) {
    var first_name = request.body.fname;
    var last_name = request.body.lname;
    var email = request.body.email;
    var password = request.body.password;

    if (!validatePassword(password)) {
        response.render('register', { dataObject: "Password too weak!"} );
        return next();
    }

    User.register(new User({ email: email, firstName: first_name, lastName: last_name }), password, function (error, account) {
        if (error) {
            response.render('register', { dataObject: "Something went wrong!"} );
            return next();
        }

        response.redirect('/login');
    });
});

module.exports = router;