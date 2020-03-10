var router = require('express').Router();

router.get('/', function(request, response) {
    response.render('index');
});

module.exports = router;
