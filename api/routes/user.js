const express = require('express');
const router  = express.Router();
const controller = require('../controllers/user');

router.post('/login',controller.login_user);

router.post('/register', controller.add_user);



module.exports = router;

