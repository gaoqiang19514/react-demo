import React, { useState, useEffect } from "react";
import axios from "axios";

const getDataEffect = (url, setData, setIsFetching, setErr) => {
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
};

function Example() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("redux");
  const [isFetching, setIsFetching] = useState(false);
  const [err, setErr] = useState(false);
  const [url, setUrl] = useState(`/api/getData?query=${query}`);

  useEffect(() => getDataEffect(url, setData, setIsFetching, setErr), [url]);

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <button
        type="button"
        onClick={() => setUrl(`/api/getData?query=${query}`)}
      >
        search
      </button>
      {err && <div>Something went wrong ...</div>}
      {isFetching ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.id}>
              <a href={item.text}>{item.text}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Example;
