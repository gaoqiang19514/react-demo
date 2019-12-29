import { takeEvery, call, put } from "redux-saga/effects";

import Api from "../api";
import { FETCH_STARTED, fetchSuccess, fetchFailure } from "../actions";

function* fetchStarted() {
  try {
    const products = yield call(Api.getProducts, "/products");
    yield put(fetchSuccess(products));
  } catch (error) {
    yield put(fetchFailure(error));
  }
}

export default function* rootSaga() {
  yield takeEvery(FETCH_STARTED, fetchStarted);
}

// while(true)用法

// take       监听action的派发
// takeEvery

// while (true) {
//   const action = yield take(patternOrChannel)
//   yield fork(saga, ...args.concat(action))
// }

// put        派发action

// fork       异步发起请求
// call       同步发起请求
