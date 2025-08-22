async function fetchCoords(city) {
  const res = await fetch(`/.netlify/functions/weather?city=${city}`);
  const data = await res.json();
  if (!data.length) throw new Error("City not found");
  return { lat: data[0].lat, lon: data[0].lon, name: data[0].name, country: data[0].country };
}

async function fetchWeather(lat, lon, units = "metric") {
  const res = await fetch(`/.netlify/functions/weather?lat=${lat}&lon=${lon}&units=${units}&type=weather`);
  return res.json();
}

async function fetchForecast(lat, lon, units = "metric") {
  const res = await fetch(`/.netlify/functions/weather?lat=${lat}&lon=${lon}&units=${units}&type=forecast`);
  return res.json();
}

function renderWeather(data, place) {
  const container = document.getElementById("weather");
  container.innerHTML = `
    <h2>Weather in ${place.name}, ${place.country}</h2>
    <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
    <p>🌡️ ${data.main.temp}°C (feels like ${data.main.feels_like}°C)</p>
    <p>💨 Wind: ${data.wind.speed} m/s</p>
  `;
}

function renderForecast(data) {
  const container = document.getElementById("forecast");
  container.innerHTML = "<h3>Forecast</h3>";
  const list = data.list.filter((_, i) => i % 8 === 0); // daily forecast (~every 24h)
  list.forEach(entry => {
    const date = new Date(entry.dt * 1000);
    container.innerHTML += `
      <div>
        <strong>${date.toDateString()}</strong>: ${entry.main.temp}°C - ${entry.weather[0].main}
      </div>
    `;
  });
}

document.getElementById("search-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = document.getElementById("city-input").value;
  try {
    const coords = await fetchCoords(city);
    const weather = await fetchWeather(coords.lat, coords.lon);
    renderWeather(weather, coords);
    const forecast = await fetchForecast(coords.lat, coords.lon);
    renderForecast(forecast);
  } catch (err) {
    alert(err.message);
  }
});
