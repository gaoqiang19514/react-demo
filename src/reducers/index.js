import {
  INCREMENT,
  DECREMENT,
  FETCH_STARTED,
  FETCH_SUCCESS,
  FETCH_FAILURE
} from "../actions";

const initialState = {
  count: 0,
  isFetching: false,
  error: null
};

export default function(state = initialState, action) {
  if (action.type === INCREMENT) {
    return {
      ...state,
      count: state.count + 1
    };
  }

  if (action.type === DECREMENT) {
    return {
      ...state,
      count: state.count - 1
    };
  }

  if (action.type === FETCH_STARTED) {
    return {
      ...state,
      isFetching: true,
      error: null
    };
  }

  if (action.type === FETCH_SUCCESS) {
    return {
      ...state,
      count: state.count + 1,
      isFetching: false
    };
  }

  if (action.type === FETCH_FAILURE) {
    return {
      ...state,
      isFetching: false,
      error: action.payload
    };
  }

  return state;
}
