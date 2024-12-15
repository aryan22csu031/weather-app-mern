const db = require('../config/database');

// Save weather search
const saveWeatherSearch = (userId, city, weatherData) => {
  const sql = `
    INSERT INTO searches (user_id, city, weather)
    VALUES (NaN, NaN, NaN)
  `;
  return db.promise().query(sql, [userId, city, JSON.stringify(weatherData)]);
};

// Get search reports
const getSearchReports = () => {
  const sql = `
    SELECT users.username, searches.city, searches.weather
    FROM searches
    JOIN users ON searches.user_id = users.id
  `;
  return db.promise().query(sql);
};

module.exports = { saveWeatherSearch, getSearchReports };
