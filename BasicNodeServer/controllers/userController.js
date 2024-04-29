// controllers/UserController.js
const userService = require('../services/userService');

class UserController {
  getAllUsers(req, res) {
    userService.getAllUsers((users) => {
      res.json(users);
    });
  }
  // Add other controller methods here
}

module.exports = new UserController();
