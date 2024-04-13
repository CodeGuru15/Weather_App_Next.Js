"use client";
import WeatherForecast from "@/components/Forecast";
import WeatherContext from "@/context/weatherContext/WeatherContext";
import { useContext, useState } from "react";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { CiTempHigh } from "react-icons/ci";

export default function Weather() {
  const { lat, lon, error, loading, weatherData, setUnit, unit } =
    useContext(WeatherContext);

  const weatherCondition: string = weatherData.weather[0].main;
  const weatherDescription: string = weatherData.weather[0].description;
  const iconCode: string = weatherData.weather[0].icon;
  const temp: number = weatherData.main.temp;
  const feels_like: number = weatherData.main.feels_like;
  const temp_min: number = weatherData.main.temp_min;
  const temp_max: number = weatherData.main.temp_max;
  const pressure: number = weatherData.main.pressure;
  const humidity: number = weatherData.main.humidity;
  const visibility: number = weatherData.visibility;
  const wind_speed: number = weatherData.wind.speed;
  const city: string = weatherData.name;
  const country: string = weatherData.sys.country;
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const today = date.getDate();

  const handleUnit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setUnit(e.target.value);
  };

  const iconLink = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <>
      <div className=" flex flex-col gap-1 p-10 text-xl bg-[url(https://images.pexels.com/photos/96622/pexels-photo-96622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] bg-no-repeat bg-cover">
        <div className=" text-3xl font-bold uppercase flex justify-center gap-2 p-2">
          <p>{city},</p>
          <p>{country}</p>
        </div>
        <div className=" tracking-widest text-white">
          <p>
            {today}/{month}/{year}
          </p>
        </div>
        <div className="flex text-white items-center gap-2">
          <img src={iconLink}></img>
          <span className=" scale-150">
            <CiTempHigh />
          </span>
          <p className=" text-3xl font-bold">
            {temp.toFixed(1)}
            {"\u00b0"}
            {unit === "metric" ? "C" : "F"}
          </p>
          <div className="flex pl-2 gap-2">
            <select
              className=" bg-transparent"
              name="unit"
              onChange={handleUnit}
              value={unit}
            >
              <option value="metric">Celsius</option>
              <option value="imperial">Fahrenheit</option>
            </select>
          </div>
        </div>

        <div className="flex gap-5 text-white tracking-wider items-end">
          <p>
            Feels like {feels_like.toFixed(1)}
            {"\u00b0"}
            {unit === "metric" ? " C" : " F"}
          </p>
          <p className=" font-semibold">{weatherCondition}</p>
          <p>{weatherDescription}</p>
        </div>
        <div className="flex items-center gap-2 text-white">
          <span className="scale-150">
            <WiHumidity />
          </span>{" "}
          {humidity}%
          <span>
            <FaWind />
          </span>
          {wind_speed}
          {unit === "metric" ? " m/s" : " Km/h"}
        </div>

        <div className=" text-white tracking-wider">
          Visibility : {visibility} m
        </div>

        <div className=" flex gap-2 text-white">
          <div>
            {temp_min.toFixed(1)}
            {"\u00b0"}/ {temp_max.toFixed(1)}
            {"\u00b0"}
            {unit === "metric" ? " C" : " F"}
          </div>
        </div>
        <div className=" text-white">Atmospheric pressure: {pressure}</div>
      </div>
      <WeatherForecast />
    </>
  );
}
