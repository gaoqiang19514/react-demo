import React, { useState } from "react";

import useFetchApi from "./CustomHooks";

function Example() {
  const [query, setQuery] = useState("redux");
  const { data, isFetching, err, setUrl } = useFetchApi();

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
