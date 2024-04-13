"use client";
import { useState, useEffect } from "react";
import WeatherContext from "./WeatherContext";
import axios from "axios";

const WeatherContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [unit, setUnit] = useState("metric");

  const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d057f5b71f0d7b20b7845e89fe846027&units=${unit}`;

  const fetchWeatherData = async (url: string) => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get(url);
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(weatherApi);
  }, [lon, lat, unit]);

  return (
    <WeatherContext.Provider
      value={{
        setLat,
        setLon,
        lat,
        lon,
        error,
        loading,
        weatherData,
        setWeatherData,
        unit,
        setUnit,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContextProvider;
