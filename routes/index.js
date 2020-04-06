var router = require('express').Router();
var appRoot = require('app-root-path');
var passport = require('passport');
var rootController = require(appRoot + '/controllers').root;

router.get('/', rootController.index);

router.get('/login', rootController.getLogin);
router.post('/login', passport.authenticate('local', {failureRedirect: '/login', failureFlash: true }), rootController.postLogin);

router.get('/register', rootController.getRegister);
router.post('/register', rootController.postRegister);

module.exports = router;