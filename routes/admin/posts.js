const posts = require('express').Router();
const appRoot = require('app-root-path');
var Post = require(appRoot + '/models').Post;
var User = require(appRoot + '/models').User;

posts.get('/', function(request, response){
	Post.find()
		.then( (result) => {response.send(result)})
		.catch((err) => response.send(err));
});

posts.post('/', function(request, response){
	var title = request.body.title;
	var content = request.body.content;
	var userId = request.user._id;

	Post.create({title: title, content: content, authorId: userId})
		.then( () => { response.redirect('back')})
		.catch( (err) => { response.send(err)});
});

module.exports = posts;
