// Map weather conditions to background images
const weatherBackgrounds = {
  day: {
    Clear: "day_clear.webp",
    Clouds: "day_clouds.jpg",
    Rain: "day_rain.jpg",
    Snow: "day_snow.jpg",
  },
  night: {
    Clear: "night_clear.jpg",
    Clouds: "night_clouds.jpg",
    Rain: "night_rain.jpg",
    Snow: "night_snow.jpg",
  },
};

// Update background based on weather & time
function updateBackground(data) {
  const dt = data.dt;
  const timezone = data.timezone;
  const localHour = new Date((dt + timezone) * 1000).getUTCHours();
  const isDay = localHour >= 6 && localHour < 18;

  const weatherMain = data.weather[0].main;
  const bgImage = isDay
    ? weatherBackgrounds.day[weatherMain] || "day_clear.webp"
    : weatherBackgrounds.night[weatherMain] || "night_clear.jpg";

  document.body.style.setProperty("--bg-image", `url('images/${bgImage}')`);

  // Trigger fade-in
  document.body.classList.remove("show-bg");
  void document.body.offsetWidth; // reflow
  document.body.classList.add("show-bg");
}

// Fetch weather data
async function getWeather(city) {
  try {
    const response = await fetch(`/.netlify/functions/weather?city=${city}`);
    const data = await response.json();

    if (data.error) {
      document.getElementById("weather").innerText = `Error: ${data.error}`;
      return;
    }

    document.getElementById("weather").innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡️ Temperature: ${data.main.temp} °C</p>
      <p>☁️ Weather: ${data.weather[0].description}</p>
    `;

    updateBackground(data);
  } catch (error) {
    document.getElementById("weather").innerText =
      "Unable to load weather data.";
  }
}

// Default city
getWeather("London");

// Search form
document.getElementById("searchForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = document.getElementById("cityInput").value;
  if (city) getWeather(city);
});
