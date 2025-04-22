import { useEffect } from "react";
import { useState } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [mainData, setMainData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [allCategories, setCategories] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setIsPending(true);
      try {
        const req = await fetch(url);
        if (!req.ok) {
          throw new Error(req.status);
        }
        const data = await req.json();
        setData(data);
        setMainData(data);
        setCategories([
          "All",
          ...new Set(
            data.map((country) => {
              return country.region;
            })
          ),
        ]);
        setIsPending(false);
      } catch (error) {
        setIsPending(false);
        setError(error.message);
      }
    };
    getData();
  }, [url]);

  const filterCategory = (category) => {
    if (category !== "All") {
      const filteredData = mainData.filter((country) => {
        return country.region === category;
      });
      setData(filteredData);
    } else {
      setData(mainData);
    }
  };

  const filterCountry = (name) => {
    if (name.trim()) {
      const filteredData = mainData.filter((country) => {
        const countryName = country.name.common.toLowerCase();
        return countryName.includes(name.toLowerCase());
      });
      setData(filteredData);
    } else {
      setData(data);
    }
  };

  return {
    data,
    error,
    isPending,
    filterCountry,
    allCategories,
    filterCategory,
  };
}

export default useFetch;
