"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import CityContext from "./cityContex";

const CityContextProvider = ({ children }: { children: any }) => {
  const [cityData, setCityData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [apiUrl, setApiUrl] = useState(
    "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100"
  );

  const fetchCityData = async (url: string) => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get(url);
      setCityData(response.data.results);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    (() => fetchCityData(apiUrl))();
  }, [apiUrl]);

  return (
    <CityContext.Provider value={{ cityData, error, loading, setApiUrl }}>
      {children}
    </CityContext.Provider>
  );
};

export default CityContextProvider;
