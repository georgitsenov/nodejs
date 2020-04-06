const appRoot = require('app-root-path');
var Post = require(appRoot + '/models').Post;

exports.index = function(request, response){
	Post.find()
		.then( (result) => {response.send(result)})
		.catch((err) => response.send(err));
};

exports.post = function(request, response){
	var title = request.body.title;
	var content = request.body.content;
	var userId = request.user._id;

	Post.create({title: title, content: content, authorId: userId})
		.then( () => { response.redirect('back')})
		.catch( (err) => { response.send(err)});
};