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
