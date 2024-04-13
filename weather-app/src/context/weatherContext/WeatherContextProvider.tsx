"use client";
import { useState, useEffect } from "react";
import WeatherContext from "./WeatherContext";
import axios from "axios";

const WeatherContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState([]);

  const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d057f5b71f0d7b20b7845e89fe846027`;

  const fetchWeatherData = async (url: string) => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get(url);
      const additionalData = await response.data.results;
      setWeatherData(additionalData);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(weatherApi);
  }, [lon, lat]);

  return (
    <WeatherContext.Provider
      value={{ setLat, setLon, error, loading, weatherData }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContextProvider;
