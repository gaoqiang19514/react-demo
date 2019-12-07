const initialState = {
  err: false,
  loading: false,
  isAuthenticated: false
};
export default (state = initialState, action) => {
  const { type } = action;
  if (type === "LOGIN_REQUEST") {
    return {
      ...state,
      err: false,
      loading: true
    };
  } else if (type === "LOGIN_SUCCESS") {
    return {
      ...state,
      loading: false,
      isAuthenticated: true
    };
  } else if (type === "LOGIN_FAILURE") {
    return { ...state, loading: false, err: action.payload };
  }
  return state;
};
