async function loadData() {
  const city = document.getElementById('city').value;

  const weatherRes = await fetch(`/weather/${city}`);
  const weather = await weatherRes.json();

  document.getElementById('weather').innerHTML = `
    <h3>Weather</h3>
    <p>Temperature: ${weather.temperature} °C</p>
    <p>Feels like: ${weather.feels_like} °C</p>
    <p>Description: ${weather.description}</p>
    <p>Wind speed: ${weather.wind_speed} m/s</p>
    <p>Rain (3h): ${weather.rain_volume} mm</p>
    <p>Coordinates: ${weather.coordinates.lat}, ${weather.coordinates.lon}</p>
  `;

  const countryRes = await fetch(`/country/${weather.country_code}`);
  const country = await countryRes.json();

  document.getElementById('country').innerHTML = `
    <h3>Country Info</h3>
    <p>Name: ${country.name}</p>
    <p>Capital: ${country.capital}</p>
    <p>Region: ${country.region}</p>
    <p>Population: ${country.population}</p>
  `;
}
