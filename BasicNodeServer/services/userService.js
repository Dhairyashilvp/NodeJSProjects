const userModel = require('../models/userModel');
const { v4: uuidv4 } = require('uuid');

class UserService {
  // Get all users
  getAllUsers(callback) {
    userModel.getAllUsers((users) => {
      callback(users);
    });
  }

  // Get a single user by ID
  getUserById(userId, callback) {
    userModel.getUserById(userId, (user) => {
      callback(user);
    });
  }

  // Create a new userss
  createUser(newUser, callback) {
    // Generate a UUID for the user
    newUser.id = uuidv4();
    userModel.createUser(newUser, (statusCode, affectedRows, error) => {
      if (statusCode === 201) {
        callback(statusCode, affectedRows, null);
      } else {
        callback(statusCode, null, error); // Pass the status code and error
      }
    });
  }

  // Update a user
  updateUser(userId, updatedUser, callback) {
    userModel.updateUser(userId, updatedUser, (user) => {
      callback(user);
    });
  }

  // Delete a user
  deleteUser(userId, callback) {
    userModel.deleteUser(userId, (deletedUser) => {
      callback(deletedUser);
    });
  }
}

module.exports = new UserService();