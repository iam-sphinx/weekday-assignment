import React, { useEffect, useState } from "react";

const useFetch = () => {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 10; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            limit: limit,
            offset: offset,
          }),
        };

        const response = await fetch(
          "https://api.weekday.technology/adhoc/getSampleJdJSON",
          requestOptions
        );
        const result = await response.json();

        setData((prev) => {
          return [...prev, ...result?.jdList];
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call the fetch function
  }, [offset]); // Include offset in the dependency array

  const nextPage = () => {
    setOffset((prevOffset) => prevOffset + limit); // Increment offset by limit
  };

  return { data, nextPage };
};

export default useFetch;
