var router = require('express').Router();

var appRoot = require('app-root-path');

router.get('/', function(request, response) {
    response.render('index', { dataObject: {} });
});

module.exports = router;
