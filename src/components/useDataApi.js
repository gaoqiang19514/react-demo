import { useState, useEffect } from "react";

function getData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([{ id: 1, name: "tom" }]);
    }, 1000);
  });
}

function useDataApi(api) {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const result = await getData(api);
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return {
    loading,
    error,
    data,
    page,
    setPage
  };
}

export default useDataApi;
