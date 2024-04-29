const userService = require('../services/userService');

class UserController {
  // Get all users
  getAllUsers(req, res) {
    userService.getAllUsers((users) => {
      res.json(users);
    });
  }

  // Get a single user by ID
  getUserById(req, res) {
    const userId = req.params.id;
    userService.getUserById(userId, (user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    });
  }

  // Create a new users
  createUser(req, res) {
    const newUser = req.body;
    userService.createUser(newUser, (statusCode, affectedRows, error) => {
      if (statusCode === 201) {
        res.status(statusCode).json({ message: 'Create user successful; Number of Affected Rows ' + affectedRows }); // Send the created user
      } else {
        res.status(statusCode).json({ message: 'Failed to create user', error: error });
      }
    });
  }

  // Update a user
  updateUser(req, res) {
    const userId = req.params.id;
    const updatedUser = req.body;
    userService.updateUser(userId, updatedUser, (user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    });
  }

  // Delete a user
  deleteUser(req, res) {
    const userId = req.params.id;
    userService.deleteUser(userId, (deletedUser) => {
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    });
  }
}

module.exports = new UserController();