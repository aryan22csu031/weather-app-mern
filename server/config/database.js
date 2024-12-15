const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Arora324(s)',
  database: 'weather_app',
});

module.exports = db;
