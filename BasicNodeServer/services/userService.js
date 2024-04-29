// services/userService.js
const userModel = require('../models/userModel');

class UserService {
  getAllUsers(callback) {
    userModel.getAllUsers((users) => {
      callback(users);
    });
  }
  // Add other service methods here
}

module.exports = new UserService();
