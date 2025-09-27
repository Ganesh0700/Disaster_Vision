import { useEffect, useState } from "react";

function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_KEY = "0a997e669ba3d30877905e67d1feac86"; // 🔑 Replace with your OpenWeather key

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          console.log("📍 User Location:", latitude, longitude);

          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
          )
            .then((res) => res.json())
            .then((data) => {
              console.log("Weather API:", data);
              setWeather({
                city: data.name,
                temp: data.main.temp,
                wind: data.wind.speed,
                pressure: data.main.pressure,
                desc: data.weather[0].description,
              });
            })
            .catch((err) => setError("Error fetching weather: " + err));
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Location access denied. Please allow location access.");
        }
      );
    } else {
      setError("Geolocation not supported in this browser.");
    }
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!weather) return <p>Loading weather...</p>;

  return (
    <div className="p-4 bg-blue-100 dark:bg-blue-800 rounded-lg shadow text-center">
      <h3 className="text-lg font-bold">🌦 Current Weather</h3>
      <p className="mt-2 font-semibold">{weather.city}</p>
      <p className="mt-1 capitalize">{weather.desc}</p>
      <p className="mt-1">🌡 Temp: {weather.temp}°C</p>
      <p className="mt-1">💨 Wind: {weather.wind} m/s</p>
      <p className="mt-1">🔽 Pressure: {weather.pressure} hPa</p>
    </div>
  );
}

export default WeatherCard;
