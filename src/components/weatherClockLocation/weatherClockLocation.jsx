import React, { useEffect, useState } from "react";

const WeatherClockLocation = () => {
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // Actualizar la hora cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Obtener ubicación del usuario
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchWeather(latitude, longitude);
        },
        (err) => {
          setError("No se pudo acceder a la ubicación.");
        }
      );
    } else {
      setError("Geolocalización no soportada en este navegador.");
    }
  }, []);

  // Obtener clima desde la API de OpenWeatherMap
  const fetchWeather = async (lat, lon) => {
    try {
      const apiKey = "cd4bf4c33cd4521c23ea93e303b5accf"; // Reemplaza con tu API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`
      );
      const data = await response.json();
      if (response.ok) {
        setWeather({
          description: data.weather[0].description,
          temperature: data.main.temp,
          city: data.name,
        });
      } else {
        setError("No se pudo obtener el clima.");
      }
    } catch (err) {
      setError("Error al obtener el clima.");
    }
  };

  return (
    <div className="weather-clock-location">
      {/* Hora */}
      <div className="clock">
        <h2>Hora actual</h2>
        <p>{time.toLocaleTimeString()}</p>
      </div>

      {/* Ubicación */}
      {location && (
        <div className="location">
          <h2>Ubicación</h2>
          <p>
            Lat: {location.latitude.toFixed(2)}, Lon:{" "}
            {location.longitude.toFixed(2)}
          </p>
        </div>
      )}

      {/* Clima */}
      {weather && (
        <div className="weather">
          <h2>Clima</h2>
          <p>
            {weather.city}: {weather.temperature}°C, {weather.description}
          </p>
        </div>
      )}

      {/* Error */}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default WeatherClockLocation;
