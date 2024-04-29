const db = require('../db/connections');

class UserModel {
  // Get all users
  getAllUsers(callback) {
    db.query('SELECT * FROM users', (err, rows) => {
      if (err) throw err;
      callback(rows);
    });
  }

  // Get a single user by ID
  getUserById(userId, callback) {
    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, rows) => {
      if (err) throw err;
      if (rows.length > 0) {
        callback(rows[0]);
      } else {
        callback(null);
      }
    });
  }

  // Create a new user
  createUser(newUser, callback) {
    db.query('INSERT INTO users SET ?', newUser, (err, result) => {
        if (err) {
            callback(500, null, err.code);
        }
        else{
            callback(201, result.affectedRows, null);
        }
    });
  }

  // Update a user
  updateUser(userId, updatedUser, callback) {
    db.query('UPDATE users SET ? WHERE id = ?', [updatedUser, userId], (err) => {
      if (err) throw err;
      callback(updatedUser);
    });
  }

  // Delete a user
  deleteUser(userId, callback) {
    db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
        callback({ id: userId });
      } else {
        callback(null);
      }
    });
  }
}

module.exports = new UserModel();