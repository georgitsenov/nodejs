var router = require('express').Router();
var appRoot = require('app-root-path');

var posts = require('./posts');


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('back');
}


router.get('/', function(request, response) {
    response.render('admin/home');
});


router.get('/logout', function(request, response) {
    request.logout();
    response.redirect('/login');
});


router.use('/posts', posts);


module.exports = router;
