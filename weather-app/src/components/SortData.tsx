"use client";
import CityContext from "@/context/cityContex/cityContex";
import { useContext, useEffect } from "react";

const SortData = () => {
  const { orderBy, setOrderBy, setCityData, setApiUrl, offset } =
    useContext(CityContext);

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCityData([]);
    setOrderBy(event.target.value);
  };

  useEffect(() => {
    setApiUrl(
      `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?order_by=${orderBy}&limit=20&offset=${offset}`
    );
  }, [orderBy]);

  return (
    <div className=" flex justify-center">
      <span className="px-2"> Sort By</span>
      <select name="sort" onChange={handleSort} value={orderBy}>
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
