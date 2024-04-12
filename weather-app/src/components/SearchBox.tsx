"use client";
import CityContext from "@/context/cityContex/cityContex";
import { useContext, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";

interface props {
  name: string;
}

const SearchBox = () => {
  const { setCityData, setOffset, setApiUrl, orderBy, offset, apiEndpoint } =
    useContext(CityContext);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestionBox, setSuggestionBox] = useState(false);

  const apiSearchUrl = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where=%22${searchText}%22&order_by=${orderBy}&limit=20&offset=${offset}`;

  const apiSuggest = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=name&where=suggest(name%2C%20%22${searchText}%22)&limit=20`;

  const fetchSuggestions = async (url: string) => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get(url);
      const suggetionData = await response.data.results;
      setSuggestions(() => suggetionData);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSuggestionBox(true);
    setSearchText(e.target.value);
    setCityData([]);
    setOffset(0);
  };

  useEffect(() => {
    if (searchText != "") {
      fetchSuggestions(apiSuggest);
      setApiUrl(apiSearchUrl);
    } else setApiUrl(apiEndpoint);
  }, [searchText]);

  return (
    <form>
      <div className="flex items-center border-b border-b-gray-300 focus-within:border-blue-500 focus-within:border-b-2">
        <span>
          <IoIosSearch />
        </span>
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          placeholder="Search location.."
          className="px-4 py-2 w-[230px] h-full focus:outline-none"
        />
      </div>
      {suggestionBox && searchText != "" && (
        <div className=" py-2 w-[230px] bg-white fixed max-h-[150px] overflow-y-scroll">
          {error && (
            <span className=" text-red-600">Opps! Something Went Wrong.</span>
          )}
          {loading && (
            <h1 className=" text-center text-green-600">Loading...</h1>
          )}
          {suggestions.length === 0 && searchText != "" && (
            <p className="px-4">No suggestions</p>
          )}
          {!loading &&
            suggestions.map((city: props, index: number) => (
              <p
                key={index}
                className="px-4 hover:bg-gray-400 cursor-pointer"
                onClick={() => {
                  setSearchText(city.name);
                  setCityData([]);
                  setSuggestionBox(false);
                }}
              >
                {city.name}
              </p>
            ))}
        </div>
      )}
    </form>
  );
};

export default SearchBox;
