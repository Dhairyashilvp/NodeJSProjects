const express = require('express');
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/login', loginController.login);
// router.post('/signup', userController.createUser);

// Create a new user
router.post('/signup', userController.createUser);

module.exports = router;
