import React, { useState } from "react";

import useFetchApi from "./CustomHooks";
import useInput from "./useInput";

function ResultView({ err, isFetching, hits }) {
  if (err) {
    return <div>Something went wrong ...</div>;
  }

  if (isFetching) {
    return <div>Fetching ...</div>;
  }

  if (hits) {
    return (
      <ul>
        {hits.map((item) => (
          <li key={item.id}>
            <a href={item.text}>{item.text}</a>
          </li>
        ))}
      </ul>
    );
  }
}

function CountExample() {
  const { count, increment, decrement } = useInput();

  return (
    <div>
      {count}
      <div>
        <button onClick={increment}>increment</button>
        <button onClick={decrement}>decrement</button>
      </div>
    </div>
  );
}

function Example() {
  const [query, setQuery] = useState("redux");
  const { isFetching, err, hits, doFetch } = useFetchApi();

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button
        type="button"
        onClick={() => doFetch(`/api/getData?query=${query}`)}
      >
        search
      </button>
      <ResultView err={err} isFetching={isFetching} hits={hits} />
      <CountExample />
    </>
  );
}

export default Example;
