export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

export const FETCH_STARTED = "FETCH_STARTED";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";

export function increment() {
  return {
    type: INCREMENT
  };
}

export function decrement() {
  return {
    type: DECREMENT
  };
}

export function fetchStarted(data) {
  return {
    type: FETCH_STARTED,
    payload: data
  };
}

export function fetchSuccess(data) {
  return {
    type: FETCH_SUCCESS,
    payload: data
  };
}

export function fetchFailure(error) {
  return {
    type: FETCH_FAILURE,
    error: true,
    payload: error
  };
}
