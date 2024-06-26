"use client";
import CityContext from "@/context/cityContext/CityContext";
import { useContext, useEffect } from "react";

const SortData = () => {
  const { orderBy, setOrderBy, setCityData, setApiUrl, offset, setSearchText } =
    useContext(CityContext);

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(event.target.value);
    setSearchText("");
    setCityData([]);
  };

  useEffect(() => {
    setApiUrl(
      `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?order_by=${orderBy}&limit=20&offset=${offset}`
    );
  }, [orderBy]);

  return (
    <div className=" flex justify-center">
      <span className="px-2"> Sort By</span>
      <select
        name="sort"
        className=" bg-inherit focus:outline-none"
        onChange={handleSort}
        value={orderBy}
      >
        <option value="name">City</option>
        <option value="cou_name_en">Country</option>
        <option value="timezone">Time Zone</option>
        <option value="population">Population</option>
        <option value="">None</option>
      </select>
    </div>
  );
};

export default SortData;
