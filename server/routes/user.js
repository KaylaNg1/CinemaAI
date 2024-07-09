const express = require('express');
const router = express.Router();
const userController = require('../controllers/user'); 

router.post('/createAccount', userController.createAccount);

module.exports = router;
