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


exports.index = async function(request, response) {
    var users = await User.find().select('firstName lastName');
    var posts = await Post.find().sort({'createdAt': 'desc'});
    
    var usersMap = {};
    users.forEach((user, index, array) => {
        usersMap[user._id] = user.toObject();
    });

    postsMap = {};
    posts.forEach((post, index, array) => {
        mappedPost = postsMap[post._id] = post.toObject();

        mappedPost.firstName = usersMap[mappedPost.authorId].firstName;
        mappedPost.lastName = usersMap[mappedPost.authorId].lastName;
    });

    response.render('index', { dataObject: postsMap});
};


exports.getLogin = function(request, response) {
    if (request.user) {
        response.redirect('/admin');
    } else {
    
        response.render('login'); 
    }   
};


exports.postLogin = function(request, response) {
    response.redirect('/admin');
};


exports.getRegister = function(request, response) {
    response.render('register');
};


exports.postRegister = function(request, response, next) {
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
};


exports.getContact = function(request, response) {
    response.render('contact');
};