"use client";
import CityContext from "@/context/cityContex/cityContex";
import { useContext } from "react";

const SortData = () => {
  const { orderBy, setOrderBy, setCityData } = useContext(CityContext);

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCityData([]);
    setOrderBy(event.target.value);
  };

  return (
    <div className=" flex justify-center">
      <span className="px-2"> Sort By</span>
      <select name="sort" onChange={handleSort} value={orderBy}>
        <option value="name">Name</option>
        <option value="cou_name_en">Country</option>
        <option value="timezone">Time Zone</option>
        <option value="population">Population</option>
        <option value="">None</option>
      </select>
    </div>
  );
};

export default SortData;
