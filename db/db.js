const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'OvL13082004$$',
  database: 'my_db'
});

module.exports = db;
