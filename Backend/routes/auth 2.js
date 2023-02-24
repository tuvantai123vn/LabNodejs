const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) =>{
    res.send("Hello, this is auth endpint")
})
router.get('/register', (req, res, next) =>{
    res.send("Hello, this is register endpint")
})

module.exports = router;