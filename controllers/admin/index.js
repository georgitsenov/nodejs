var appRoot = require('app-root-path');

exports.index = function(request, response) {
    response.render('admin/home');
};

exports.logout = function(request, response) {
    request.logout();
    response.redirect('/login');
};