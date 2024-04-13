"use client";

import Link from "next/link";
import CityContext from "../context/cityContext/CityContext";
import { useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import WeatherContext from "@/context/weatherContext/WeatherContext";

interface props {
  name: string;
  cou_name_en: string;
  timezone: string;
  population: number;
  coordinates: { lon: number; lat: number };
}

const Data = () => {
  const { cityData, error, loading, hasMore, loadMoreData } =
    useContext(CityContext);
  const { setLat, setLon } = useContext(WeatherContext);

  return (
    <div className="flex flex-col p-5 justify-center items-center">
      {error && (
        <h1 className="flex flex-col gap-2 text-3xl font-semibold text-red-500">
          <span>Something Went Wrong.</span>
          <span className="text-center ">Please Try Again.</span>
        </h1>
      )}
      {loading && (
        <h1 className="text-3xl font-semibold text-green-500">Loading...</h1>
      )}

      {cityData.length != 0 && (
        <InfiniteScroll
          hasMore={hasMore}
          next={loadMoreData}
          dataLength={cityData.length}
          loader={
            <p className=" text-2xl text-green-600 text-center">Loading...</p>
          }
        >
          <table>
            <thead>
              <tr>
                <th className="border border-black p-1 w-[150px] text-center">
                  CITY
                </th>
                <th className="border border-black p-1 w-[150px] text-center">
                  COUNTRY
                </th>
                <th className="border border-black p-1 w-[150px] text-center">
                  TIMEZONE
                </th>
                <th className="border border-black p-1 w-[150px] text-center">
                  Population
                </th>
              </tr>
            </thead>

            <tbody>
              {cityData.map((item: props, index: number) => (
                <tr key={index}>
                  <td className="border border-black p-1 w-[150px] text-center">
                    <Link
                      href="/weather"
                      onClick={() => {
                        setLat(item.coordinates.lat);
                        setLon(item.coordinates.lon);
                      }}
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td className="border border-black p-1 w-[150px] text-center">
                    {item.cou_name_en}
                  </td>
                  <td className="border border-black p-1 w-[150px] text-center">
                    {item.timezone}
                  </td>
                  <td className="border border-black p-1 w-[150px] text-center">
                    {item.population}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Data;
