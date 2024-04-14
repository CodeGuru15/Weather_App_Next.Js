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
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const forecastApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d057f5b71f0d7b20b7845e89fe846027&units=${unit}`;

  const fetchForecastData = async (url: string) => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get(url);
      setForecastData(response.data.list);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForecastData(forecastApi);
  }, [lon, lat, unit]);

  return (
    <>
      <div className=" text-white p-2 text-center">WEATHER FORECAST</div>
      <div className="flex gap-1 w-[80vw] overflow-x-scroll overflow-y-hidden">
        {error && (
          <h1 className="flex flex-col gap-2 text-3xl font-semibold text-red-500">
            <span>Something Went Wrong.</span>
            <span className="text-center ">Please Try Again.</span>
          </h1>
        )}
        {loading && (
          <h1 className="sm:text-3xl font-semibold text-white">Loading...</h1>
        )}
        {forecastData.map((item: weather, index: number) => (
          <div
            key={index}
            className=" hover:scale-105 duration-300 h-[320px] p-5 rounded-sm text-white flex flex-col backdrop-blur-sm bg-black/30 "
          >
            <div>{item.dt_txt}</div>
            <div className="">
              {item.main.temp.toFixed(1)}
              {"\u00b0"}
              {unit === "metric" ? " C" : " F"}
            </div>
            <div>
              {item.main.temp_max.toFixed(1)}
              {"\u00b0"}
              {unit === "metric" ? " C" : " F"}
            </div>
            <div>
              {item.main.temp_min.toFixed(1)}
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
    </>
  );
};

export default WeatherForecast;
