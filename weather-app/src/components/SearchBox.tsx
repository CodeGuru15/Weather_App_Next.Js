"use client";
import CityContext from "@/context/cityContex/cityContex";
import { useContext } from "react";

const SearchBox = () => {
  const { searchText, setSearchText, setCityData, setOffset } =
    useContext(CityContext);

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
    setCityData([]);
    setOffset(0);
  };

  return (
    <form>
      <input
        type="text"
        value={searchText}
        onChange={handleSearch}
        placeholder="Search location.."
        className="px-4 py-2 w-[230px] border border-gray-300 rounded-md h-full focus:outline-none focus:border-blue-500"
      />
    </form>
  );
};

export default SearchBox;
