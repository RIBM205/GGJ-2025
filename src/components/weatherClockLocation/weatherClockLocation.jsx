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
          setError("No se pudo acceder a la ubicación.");
        }
      );
    } else {
      setError("Geolocalización no soportada.");
    }
  }, []);

  const fetchWeather = async (lat, lon) => {
    try {
      const apiKey = "TU_API_KEY";
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`
      );
      const data = await resp.json();
      if (resp.ok) {
        setWeather({
          description: data.weather[0].description,
          temperature: data.main.temp,
          city: data.name,
        });
      } else {
        setError("No se pudo obtener el clima.");
      }
    } catch (e) {
      setError("Error al obtener el clima.");
    }
  };

  return (
    <div className="weather-clock-location">
      <div className="clock">
        <h2>Hora actual</h2>
        <p>{time.toLocaleTimeString()}</p>
      </div>

      {location && (
        <div className="location">
          <h2>Ubicación</h2>
          <p>
            Lat: {location.latitude.toFixed(2)}, Lon:{" "}
            {location.longitude.toFixed(2)}
          </p>
        </div>
      )}

      {weather && (
        <div className="weather">
          <h2>Clima</h2>
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
