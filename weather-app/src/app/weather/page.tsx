"use client";
import WeatherForecast from "@/components/Forecast";
import WeatherContext from "@/context/weatherContext/WeatherContext";
import { useContext, useState } from "react";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { CiTempHigh } from "react-icons/ci";

export default function Weather() {
  const { error, loading, weatherData, setUnit, unit } =
    useContext(WeatherContext);

  const weatherCondition: string = weatherData?.weather?.[0]?.main;
  const weatherDescription: string = weatherData.weather?.[0]?.description;
  const iconCode: string = weatherData?.weather?.[0]?.icon;
  const temp: number = weatherData?.main?.temp;
  const feels_like: number = weatherData?.main?.feels_like;
  const temp_min: number = weatherData?.main?.temp_min;
  const temp_max: number = weatherData?.main?.temp_max;
  const pressure: number = weatherData?.main?.pressure;
  const humidity: number = weatherData?.main?.humidity;
  const visibility: number = weatherData?.visibility;
  const wind_speed: number = weatherData?.wind?.speed;
  const city: string = weatherData?.name;
  const date = new Date();
  const hour = date.getHours();
  const min = date.getMinutes();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const today = date.getDate();

  const handleUnit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setUnit(e.target.value);
  };

  const iconLink = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const rain =
    "bg-[url(https://images.pexels.com/photos/531906/pexels-photo-531906.jpeg?auto=compress&cs=tinysrgb&w=1000)]";
  const snow =
    "bg-[url(https://images.pexels.com/photos/3462588/pexels-photo-3462588.jpeg?auto=compress&cs=tinysrgb&w=1000)]";
  const clouds =
    "bg-[url(https://images.pexels.com/photos/1269777/pexels-photo-1269777.jpeg?auto=compress&cs=tinysrgb&w=1000)]";
  const drizzle =
    "bg-[url(https://images.pexels.com/photos/1028600/pexels-photo-1028600.jpeg?auto=compress&cs=tinysrgb&w=1000)]";
  const clear =
    "bg-[url(https://images.pexels.com/photos/96622/pexels-photo-96622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)]";
  const thunderstrom =
    "bg-[url(https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=1000)]";

  const getBackground = (condition: string) => {
    switch (condition) {
      case "Clear":
        return { bgUrl: clear };
      case "Rain":
        return { bgUrl: rain };
      case "Clouds":
        return { bgUrl: clouds };
      case "Snow":
        return { bgUrl: snow };
      case "Drizzle":
        return { bgUrl: drizzle };
      case "Thunderstrom":
        return { bgUrl: thunderstrom };

      default:
        return { bgUrl: clear };
    }
  };

  const bg = weatherData ? getBackground(weatherCondition).bgUrl : "";

  const style =
    "min-h-screen flex flex-col items-center gap-1 p-5 text-xl bg-no-repeat bg-cover " +
    bg;

  return (
    <>
      <div className={style}>
        {error && (
          <h1 className="flex flex-col gap-2 text-3xl font-semibold text-red-500">
            <span>Something Went Wrong.</span>
            <span className="text-center ">Please Try Again.</span>
          </h1>
        )}
        {loading && (
          <h1 className="sm:text-3xl font-semibold text-white">Loading...</h1>
        )}
        <div className="sm:flex sm:gap-5">
          <div className=" p-1 mb-5 rounded-lg bg-white/30 backdrop-blur-sm text-slate-800 flex flex-col items-center">
            <div className="flex gap-5 items-center font-bold uppercase">
              <p className="md:text-3xl text-center sm:text-xl">{city}</p>
              <p>
                {today}/{month}/{year}
              </p>
            </div>
            <div className=" p-2">
              {hour} : {min < 10 ? `0${min}` : min}
            </div>

            <div className="flex items-center gap-2">
              <img className=" h-[50px]" src={iconLink}></img>
              <span className="sm:scale-[200%]">
                <CiTempHigh />
              </span>
              <p className="md:text-5xl sm:text-2xl text-xl font-bold">
                {temp.toFixed(1)}
                {"\u00b0"}
                {unit === "metric" ? "C" : "F"}
              </p>
              <div className="flex pl-2 gap-2">
                <select
                  className="w-[50px] bg-transparent"
                  name="unit"
                  onChange={handleUnit}
                  value={unit}
                >
                  <option value="metric" className=" text-blue-800">
                    {"\u00b0"}C
                  </option>
                  <option value="imperial" className="text-blue-800">
                    {"\u00b0"}F
                  </option>
                </select>
              </div>
            </div>

            <div className="flex items-center text-center gap-2 pb-5 sm:text-xl  sm:tracking-wider">
              <p>
                Feels like {feels_like.toFixed(1)}
                {"\u00b0"}
                {unit === "metric" ? " C" : " F"}
              </p>
              <p className=" font-semibold">{weatherCondition}</p>
              <p className=" text-xs">{weatherDescription}</p>
            </div>
          </div>
          <div className=" bg-black/30 rounded-md mx-auto w-max p-5 text-base">
            <div className="flex justify-center items-center gap-2 text-white">
              <span className="scale-150">
                <WiHumidity />
              </span>{" "}
              {humidity} %
              <span>
                <FaWind />
              </span>
              {wind_speed}
              {unit === "metric" ? " m/s" : " Km/h"}
            </div>

            <div className=" text-center text-white tracking-wider">
              Visibility : {visibility} m
            </div>

            <div className=" justify-center flex gap-2 text-white">
              <div>
                H : {temp_min.toFixed(1)}
                {"\u00b0"} / L : {temp_max.toFixed(1)}
                {"\u00b0"}
                {unit === "metric" ? " C" : " F"}
              </div>
            </div>
            <div className=" text-center text-white">
              Atmospheric pressure: {pressure}
            </div>
          </div>
        </div>
        <WeatherForecast />
      </div>
    </>
  );
}
