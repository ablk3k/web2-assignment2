const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Serve static files from project root so index.html, script.js, and style.css
// are available at http://localhost:PORT/
app.use(express.static(__dirname));

app.get('/weather/:city', async (req, res) => {
  const city = req.params.city;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  try {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          q: city,
          units: 'metric',
          appid: apiKey
        }
      }
    );

    const data = response.data;

    res.json({
      temperature: data.main.temp,
      description: data.weather[0].description,
      coordinates: data.coord,
      feels_like: data.main.feels_like,
      wind_speed: data.wind.speed,
      country_code: data.sys.country,
      rain_volume: data.rain ? data.rain['3h'] || 0 : 0
    });

  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

// ❗❗❗ ҚАРА: country endpoint төменде
app.get('/country/:code', async (req, res) => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/alpha/${req.params.code}`
    );

    const country = response.data[0];

    res.json({
      name: country.name.common,
      capital: country.capital[0],
      region: country.region,
      population: country.population
    });

  } catch (error) {
    res.status(500).json({ error: 'Country not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
