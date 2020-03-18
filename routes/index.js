var router = require('express').Router();

var appRoot = require('app-root-path');
var connection = require(appRoot + '/db');

router.get('/', function(request, response) {
	var query = 'SELECT posts.created_at, title, content, first_name, last_name FROM ' +
				'posts LEFT JOIN users on posts.user_id=users.id;';

    connection.query(query, function(error, result, fields) {
		dataObject = Object.assign({}, result);
        response.render('index', {dataObject: dataObject});
    });
});

module.exports = router;
