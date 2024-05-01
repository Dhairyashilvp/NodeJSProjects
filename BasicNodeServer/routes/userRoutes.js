// routes/userRoutes.js
const express = require('express');

const router = express.Router();
const authMiddleware = require('../helper/authMiddleware');
const userController = require('../controllers/userController');
// const loginController = require('../controllers/loginController');

router.use(authMiddleware);

router.get('/users', userController.getAllUsers);

// Get a single user by ID
router.get('/users/:id', userController.getUserById);

// Update a user
router.put('/users/:id', userController.updateUser);

// Delete a user
router.delete('/users/:id', userController.deleteUser);

// login
// router.post('/login/:id', loginController.getUserById);

module.exports = router;
