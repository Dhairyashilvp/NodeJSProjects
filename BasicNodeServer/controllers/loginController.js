/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
require('dotenv').config();

class LoginController {
  // Login user and generate JWT token
  login(req, res) {
    const { username, password } = req.body;
    // Authenticate user
    userService.authenticate(username, password, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      // Generate JWT token
      const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP });

      res.json({ token });
    });
  }
}

module.exports = new LoginController();
