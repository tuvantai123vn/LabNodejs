const express = require('express');

const router = express.Router();
const path = require('path');
const rootDir = require('../util/path');

router.get('/',(req, res, next) => {
    // console.log('In the middleware');
    res.sendFile(path.join(rootDir, 'views', 'index.html'))
});

module.exports = router;