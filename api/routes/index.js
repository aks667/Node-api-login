const express = require('express');
const router  = express.Router();
const checkAuth = require('../middleware/check-auth');


router.get('/', checkAuth, function (req, res, next){    
    res.status(200).json({
        message: 'Welcome to Node API'
    })
});


module.exports = router;

