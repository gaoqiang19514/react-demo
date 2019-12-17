const FETCH_REQUEST = "FETCH_REQUEST";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_FAILURE = "FETCH_FAILURE";
const SEARCH_RESET = "SEARCH_RESET";
const SET_SCROLL_TOP = "SET_SCROLL_TOP";

let start = 0;

const createCount = () => {
  const arr = [];
  for (let i = 0; i < 10; i++) {
    start = start + 1;
    arr.push(start);
  }
  return arr;
};

// 发起查询
export const featchStarted = params => {
  return dispatch => {
    dispatch({
      type: FETCH_REQUEST,
      payload: { searchText: params.searchText }
    });

    // use params.searchText params.currPage ... sarted fetch
    setTimeout(() => {
      dispatch({
        type: FETCH_SUCCESS,
        payload: {
          currPage: params.currPage,
          dataList: createCount()
        }
      });

      // dispatch({
      //   type: FETCH_FAILURE,
      //   payload: {
      //     error: new Error("网络错误")
      //   }
      // });
    }, 2000);
  };
};

// 重置redux
export const resetSearch = () => {
  return {
    type: SEARCH_RESET
  };
};

// 设置scrollTop
export const setScrollTop = scrollTop => {
  return {
    type: SET_SCROLL_TOP,
    payload: {
      scrollTop
    }
  };
};
