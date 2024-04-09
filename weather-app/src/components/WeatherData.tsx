"use client";

import CityContext from "@/context/cityContex/cityContex";
import { useContext } from "react";

interface props {
  name: string;
  cou_name_en: string;
  timezone: string;
  population: number;
}

const Data = () => {
  const { cityData, error, loading } = useContext(CityContext);

  return (
    <div className="flex justify-center">
      {error && (
        <h1 className="flex flex-col gap-2 text-3xl font-semibold text-red-500">
          <span>Something Went Wrong.</span>
          <span className="text-center ">Please Try Again.</span>
        </h1>
      )}
      {loading && (
        <h1 className="text-3xl text-center font-semibold text-red-500">
          Loading...
        </h1>
      )}
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
              POPULATION
            </th>
          </tr>
        </thead>
        <tbody>
          {cityData.map((item: props, index: number) => (
            <tr key={index}>
              <td className="border border-black p-1 w-[150px] text-center">
                {item.name}
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
    </div>
  );
};

export default Data;
