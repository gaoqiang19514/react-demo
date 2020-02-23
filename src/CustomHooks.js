import { useState, useEffect, useReducer } from "react";
import axios from "axios";

const initialState = {
  isFetching: false,
  err: false,
  hits: []
};

function reducer(state, action) {
  const { type, payload } = action;
  
  if (type === "FETCH_REQUEST") {
    return {
      ...state,
      isFetching: true,
      err: false
    };
  }

  if (type === "FETCH_SUCCESS") {
    return {
      ...state,
      isFetching: false,
      hits: payload
    };
  }

  if (type === "FETCH_FAILURE") {
    return {
      ...state,
      isFetching: false,
      err: payload
    };
  }

  return state;
}

function useFetchApi() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [url, setUrl] = useState(`/api/getData?query=redux`);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios(url);
        if (didCancel) {
          return;
        }
        dispatch({ type: "FETCH_SUCCESS", payload: data.data });
      } catch (err) {
        if (didCancel) {
          return;
        }
        dispatch({ type: "FETCH_FAILURE", payload: err });
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url]);

  const doFetch = (url) => {
    // 对url做一些合法性判断
    setUrl(url)
  }

  return {
    ...state,
    doFetch
  };
}

export default useFetchApi;
