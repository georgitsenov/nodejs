const posts = require('express').Router();
const appRoot = require('app-root-path');
var postsController = require(appRoot + '/controllers/admin/posts');

posts.get('/', postsController.index);

posts.post('/', postsController.post);

module.exports = posts;