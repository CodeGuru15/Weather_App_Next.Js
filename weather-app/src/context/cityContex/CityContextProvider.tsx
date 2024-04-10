"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import CityContext from "./cityContex";

interface City {
  name: string;
  cou_name_en: string;
  timezone: string;
  population: number;
}

const CityContextProvider = ({ children }: { children: any }) => {
  const [cityData, setCityData] = useState<City[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const [apiUrl, setApiUrl] = useState(
    `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${offset}`
  );

  const fetchCityData = async (url: string) => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get(url);
      const additionalData = response.data.results;
      setCityData((prevData) => [...prevData, ...additionalData]);
      setHasMore(additionalData.length > 0);
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
    fetchCityData(apiUrl);
  }, [apiUrl, offset]);

  return (
    <CityContext.Provider
      value={{
        cityData,
        error,
        loading,
        loadMoreData,
        hasMore,
        offset,
        setApiUrl,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

export default CityContextProvider;
