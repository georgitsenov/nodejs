const posts = require('express').Router();
var appRoot = require('app-root-path');
var connection = require(appRoot + '/db');

posts.get('/', function(request, response){
	if (request.session.loggedin) {
	    connection.query('SELECT * FROM posts', function(error, result, fields) {
			response.send(result);
	        //sponse.json(result);
	    });	
	} else {
		response.status(401).end();
	}
});

module.exports = posts;
