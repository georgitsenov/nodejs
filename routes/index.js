var router = require('express').Router();

router.get('/', function(request, response) {
    response.send("POSTS");
});

module.exports = router;
