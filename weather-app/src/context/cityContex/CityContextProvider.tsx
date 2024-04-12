"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import CityContext from "./cityContex";

interface City {
  name: string;
  cou_name_en: string;
  timezone: string;
  population: number;
  coordinates: { lon: number; lat: number };
}

const CityContextProvider = ({ children }: { children: any }) => {
  const [cityData, setCityData] = useState<City[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [orderBy, setOrderBy] = useState("");

  const apiSearchUrl = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where=%22${searchText}%22&order_by=${orderBy}&limit=20&offset=${offset}`;

  const apiUrl = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?order_by=${orderBy}&limit=20&offset=${offset}`;

  const fetchCityData = async (url: string) => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get(url);
      const additionalData = await response.data.results;
      setCityData(() => [...cityData, ...additionalData]);
      setHasMore(additionalData.length >= 20); // 20 here the page limit
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const loadMoreData = () => {
    setOffset((prevOffset) => prevOffset + 20);
  };

  useEffect(() => {
    setTimeout(
      () => fetchCityData(searchText != "" ? apiSearchUrl : apiUrl),
      1000
    );
  }, [offset, searchText, orderBy]);

  return (
    <CityContext.Provider
      value={{
        cityData,
        error,
        loading,
        loadMoreData,
        hasMore,
        setHasMore,
        offset,
        setCityData,
        searchText,
        setSearchText,
        setOffset,
        orderBy,
        setOrderBy,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

export default CityContextProvider;
