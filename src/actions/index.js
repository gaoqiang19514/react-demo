import axios from "axios";
import uuid from "uuid";

const FETCH_REQUEST = "FETCH_REQUEST";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_FAILURE = "FETCH_FAILURE";
const SEARCH_RESET = "SEARCH_RESET";
const SET_SCROLL_TOP = "SET_SCROLL_TOP";

// 发起查询
export const featchStarted = params => {
  return (dispatch, getState) => {
    const id = uuid();
    dispatch({
      type: FETCH_REQUEST,
      payload: { searchText: params.searchText, id }
    });
    // 怎么在这里丢弃请求呢？
    // 1. 请求还未响应，但是用户切换了路由等操作，导致组件以及销毁
    // 2. 用户发起了一个新的请求
    axios
      .get("/user/12345", {
        cancelToken: params.cancelToken,
        params: {
          ...params
        }
      })
      .then(res => {
        const { data } = res
        const { currentId } = getState();
        if (id !== currentId) {
          return;
        }
        dispatch({
          type: FETCH_SUCCESS,
          payload: {
            currPage: params.currPage,
            dataList: data.data
          }
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_FAILURE,
          payload: {
            error: new Error("网络错误")
          }
        });
      });
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
