const posts = require('express').Router();
const appRoot = require('app-root-path');
const Post = require(appRoot + '/models/post');

posts.get('/', function(request, response){
	if (request.session.loggedIn) {
		Post.find()
			.then( (result) => {response.send(result)})
			.catch((err) => response.send(err));
	} else {
		response.status(401).end();
	}
});

module.exports = posts;
