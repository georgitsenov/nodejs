var router = require('express').Router();
var appRoot = require('app-root-path');

var adminController = require(appRoot + '/controllers/admin');
var postRouter = require(appRoot + '/routes/admin/posts');


router.get('/', adminController.index);

router.get('/logout', adminController.logout);

router.use('/posts', postRouter);


module.exports = router;