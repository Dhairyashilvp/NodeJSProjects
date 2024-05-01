const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

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
    newUser.id = uuidv4();
    // Hash the password before storing it
    bcrypt.hash(newUser.password, 10, (err, hash) => {
      if (err) {
        return callback(500, null, `Error hashing password:${err}`);
      }
      newUser.password = hash;
      userModel.createUser(newUser, (statusCode, affectedRows, error) => {
        if (statusCode === 201) {
          callback(statusCode, affectedRows, null);
        } else {
          callback(statusCode, null, error); // Pass the status code and error
        }
      });
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

  authenticate(username, password, callback) {
    userModel.getUserByUsername(username, (err, user) => {
      if (err) {
        console.error('Error retrieving user:', err);
        return callback(err, null);
      }

      if (!user) {
        // User not found
        return callback(null, null);
      }

      // Compare passwords
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return callback(err, null);
        }

        if (!isMatch) {
          // Passwords don't match
          return callback(null, null);
        }

        // Passwords match
        callback(null, {
          id: user.id,
          username: user.username,
        });
      });
    });
  }
}

module.exports = new UserService();
