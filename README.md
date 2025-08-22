# Weather App – Secure, Serverless API Integration

A simple, responsive weather app that fetches real-time weather data while keeping your API key secure using a serverless proxy.

---

## Features

- Real-time weather data for any city
- Serverless proxy to hide API key
- Clean, responsive UI built with HTML, CSS, and JavaScript
- Easy to deploy on Netlify

---

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Backend / Proxy:** Netlify Functions (serverless)  

---

## File Structure

weather-app-secure.zip
│
├─ index.html → UI skeleton
├─ style.css → External styles
├─ script.js → Frontend logic (calls proxy)
├─ netlify/functions/weather.js → Serverless proxy (hides API key)
└─ netlify.toml → Netlify config
