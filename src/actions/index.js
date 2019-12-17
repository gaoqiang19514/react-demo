const FETCH_REQUEST = "FETCH_REQUEST";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_FAILURE = "FETCH_FAILURE";
const SEARCH_RESET = "SEARCH_RESET";

// 发起查询
export const featchStarted = searchText => {
  return dispatch => {
    dispatch({ type: FETCH_REQUEST, payload: { searchText } });

    // use searchText sarted fetch
    setTimeout(() => {
      dispatch({
        type: FETCH_SUCCESS,
        payload: {
          dataList: [1, 2, 3, 4, 5, 6]
        }
      });

      // dispatch({
      //   type: FETCH_FAILURE,
      //   payload: {
      //     error: new Error("网络错误")
      //   }
      // });
    }, 4000);
  };
};

// 重置redux
export const resetSearch = () => {
  return {
    type: SEARCH_RESET
  };
};
