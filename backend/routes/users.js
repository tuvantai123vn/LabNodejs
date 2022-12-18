const express = require('express');

const router = express.Router();

router.get('/users',(req, res, next) => {
    // console.log('In the middleware');
    res.send('<p>The Middleware that handles just/user</p>')
});

module.exports = router;