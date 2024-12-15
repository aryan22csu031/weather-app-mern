const express = require('express');
const axios = require('axios');
const authenticate = require('../middlewares/authMiddleware');
const { saveWeatherSearch } = require('../models/searchModel');

const router = express.Router();

// Fetch weather and save the search
router.post('/weather', authenticate, async (req, res) => {
  const { city } = req.body;
  const API_KEY = '58094614d54f52c5891205d862dbddaf'; 

  try {
    const response = await axios.get(
      `https://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`
    );

    if (response.data.error) {
      return res.status(400).json({ error: 'Unable to fetch weather data' });
    }

    const weatherData = response.data;

    await saveWeatherSearch(req.user.id, city, weatherData);

    res.json({ message: 'Weather data fetched successfully', data: weatherData });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
