const db = require('../config/database');

const createUser = (username, password) => {
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  return db.promise().query(sql, [username, password]);
};

const findUserByUsername = (username) => {
  const sql = 'SELECT * FROM users WHERE username = ?';
  return db.promise().query(sql, [username]);
};

module.exports = { createUser, findUserByUsername };
