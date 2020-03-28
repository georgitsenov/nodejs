var router = require('express').Router();
var appRoot = require('app-root-path');
var Post = require(appRoot + '/models').Post;

router.get('/', function(request, response) {
    Post.find()
        .then( (result) => {
            response.render('index', { dataObject: result })
        });
    
});

module.exports = router;