import React, { useEffect, useState } from "react";

const WeatherClockLocation = () => {
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation({ latitude, longitude });
          fetchWeather(latitude, longitude);
        },
        (err) => {
          setError("Could not access location.");
        }
      );
    } else {
      setError("Geolocation not supported.");
    }
  }, []);

  const fetchWeather = async (lat, lon) => {
    try {
      const apiKey = "cd4bf4c33cd4521c23ea93e303b5accf";
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${apiKey}`
      );
      const data = await resp.json();
      if (resp.ok) {
        setWeather({
          temperature: data.main.temp,
          description: data.weather[0].description,
          city: data.name,
        });
      } else {
        setError("Could not retrieve weather.");
      }
    } catch (e) {
      setError("Error fetching weather.");
    }
  };

  return (
    <div className="weather-clock-location">
      <div className="clock">
        <h2>Current Time</h2>
        <p>{time.toLocaleTimeString()}</p>
      </div>

      {location && (
        <div className="location">
          <h2>Location</h2>
          <p>
            Lat: {location.latitude.toFixed(2)}, Lon:{" "}
            {location.longitude.toFixed(2)}
          </p>
        </div>
      )}

      {weather && (
        <div className="weather">
          <h2>Weather</h2>
          <p>
            {weather.city}: {weather.temperature}°C, {weather.description}
          </p>
        </div>
      )}

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default WeatherClockLocation;