var router = require('express').Router();

var appRoot = require('app-root-path');
var connection = require(appRoot + '/db');

router.get('/', function(request, response) {
    connection.query('SELECT * FROM posts', function(error, result, fields) {
        response.render('index', result);
    });
});

module.exports = router;
