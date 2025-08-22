import fetch from "node-fetch";

export async function handler(event) {
  const API_KEY = process.env.OPENWEATHER_KEY;
  const { city, lat, lon, type = "weather", units = "metric" } = event.queryStringParameters;

  let url = "";

  if (city && !lat && !lon) {
    url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`;
  } else if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/${type}?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing parameters (need city OR lat+lon)" }),
    };
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
