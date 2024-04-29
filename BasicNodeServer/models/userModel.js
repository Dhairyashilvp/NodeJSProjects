// models/User.js
const db = require('../db/connections');

class User {
  getAllUsers(callback) {
    db.query('SELECT * FROM users', (err, rows) => {
      if (err) throw err;
      callback(rows);
    });
  }
  // Add other model methods here
}

module.exports = new User();
