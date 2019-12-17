const initialState = {
  items: [], //  用来存放搜索结果
  isFetching: false, //  加载状态
  error: null, //  错误信息
  index: 0, //  当前视图
  currPage: 0, //  当前页面
  scrollTop: 0 //  滚动条高度
};

export default (state = initialState, action) => {
  // 开始请求
  if (action.type === "FETCH_REQUEST") {
    return {
      ...state,
      error: null,
      isFetching: true
    };
  }

  // 请求成功
  if (action.type === "FETCH_SUCCESS") {
    return {
      ...state,
      isFetching: false,
      items: [...state.items, ...action.payload.dataList]
    };
  }

  // 请求失败
  if (action.type === "FETCH_FAILURE") {
    return {
      isFetching: false,
      error: action.payload.error
    };
  }

  // 设置index
  if (action.type === "SET_INDEX") {
    return {
      ...state,
      index: action.payload.index
    };
  }

  // 设置currPage
  if (action.type === "SET_CURR_PAGE") {
    return {
      ...state,
      currPage: action.payload.currPage
    };
  }

  // 设置scrollTop
  if (action.type === "SET_SCROLL_TOP") {
    return {
      ...state,
      scrollTop: action.payload.scrollTop
    };
  }

  return state;
};
