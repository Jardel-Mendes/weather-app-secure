async function getWeather(city) {
  try {
    const response = await fetch(`/.netlify/functions/weather?city=${city}`);
    const data = await response.json();

    if (data.error) {
      document.getElementById("weather").innerText =
        `Error: ${data.error}`;
      return;
    }

    document.getElementById("weather").innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡️ Temperature: ${data.main.temp} °C</p>
      <p>☁️ Weather: ${data.weather[0].description}</p>
    `;
  } catch (error) {
    document.getElementById("weather").innerText =
      "Unable to load weather data.";
  }
}

// Example: fetch weather for default city
getWeather("London");

// Optional: handle user search form
document.getElementById("searchForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = document.getElementById("cityInput").value;
  if (city) getWeather(city);
});
