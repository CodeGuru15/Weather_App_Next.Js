"use client";
import CityContext from "@/context/cityContex/cityContex";
import { useContext, useEffect, useState } from "react";

const SearchBox = () => {
  const [searchText, setSearchText] = useState("");
  const { setApiUrl, offset } = useContext(CityContext);

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    setApiUrl(
      searchText != ""
        ? `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${offset}&where=%22${searchText}%22`
        : `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${offset}`
    );
  }, [searchText]);

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
