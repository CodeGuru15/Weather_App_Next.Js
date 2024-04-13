"use client";

import WeatherContext from "@/context/weatherContext/WeatherContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

interface weather {
  dt_txt: string;

  main: { temp: number; temp_min: number; temp_max: number };
  weather: [{ main: string; icon: string }];
}

const WeatherForecast = () => {
  const { lat, lon, unit } = useContext(WeatherContext);
  const [forecastData, setForecastData] = useState([]);

  const forecastApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d057f5b71f0d7b20b7845e89fe846027&units=${unit}`;

  const fetchForecastData = async (url: string) => {
    try {
      // setLoading(true);
      // setError(false);
      const response = await axios.get(url);
      setForecastData(response.data.list);
      // setLoading(false);
    } catch (error) {
      // setError(true);
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchForecastData(forecastApi);
  }, [lon, lat, unit]);

  return (
    <div>
      {forecastData.map((item: weather, index: number) => (
        <div key={index} className=" border flex flex-col w-max p-5 bgy3 ">
          <div>{item.dt_txt}</div>
          <div className=" font-semibold">
            {item.main.temp}
            {"\u00b0"}
            {unit === "metric" ? " C" : " F"}
          </div>
          <div>
            {item.main.temp_max}
            {"\u00b0"}
            {unit === "metric" ? " C" : " F"}
          </div>
          <div>
            {item.main.temp_min}
            {"\u00b0"}
            {unit === "metric" ? " C" : " F"}
          </div>

          <div>{item.weather[0].main}</div>
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt=""
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;
