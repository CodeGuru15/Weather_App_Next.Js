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
    <div className="flex flex-col p-5 justify-center">
      {error && (
        <h1 className="flex flex-col gap-2 text-3xl font-semibold text-red-500">
          <span>Something Went Wrong.</span>
          <span className="text-center ">Please Try Again.</span>
        </h1>
      )}
      {loading && (
        <div className=" absolute flex justify-center w-[100vw] top-5 z-50">
          <h1 className="text-3xl font-semibold text-green-600">Loading...</h1>
        </div>
      )}
      {cityData.length === 0 ? (
        <div className=" flex justify-center text-red-600 text-3xl">
          {" "}
          <p>No such data found</p>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Data;
