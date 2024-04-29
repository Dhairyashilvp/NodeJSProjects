const userService = require('../services/userService');

class LoginController {

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
  
}

module.exports = new LoginController();