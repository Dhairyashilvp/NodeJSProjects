// db/connection.js
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "dp",
    password: "**********",
    database: 'myserverdb'
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err.stack);
    return;
  }
  console.log('Connected to database');
});

module.exports = connection;


