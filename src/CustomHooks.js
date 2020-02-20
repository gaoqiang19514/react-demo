import { useState, useEffect } from "react";
import axios from "axios";

function useFetchApi() {
  const [data, setData] = useState({ hits: [] });
  const [isFetching, setIsFetching] = useState(false);
  const [err, setErr] = useState(false);
  const [url, setUrl] = useState(`/api/getData?query=redux`);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      setErr(false);

      try {
        const { data } = await axios(url);
        setData({
          hits: data.data
        });
      } catch (err) {
        setErr(err);
      }

      setIsFetching(false);
    };

    fetchData();
  }, [url]);

  return {
    data,
    isFetching,
    err,
    setUrl
  };
}

export default useFetchApi;
