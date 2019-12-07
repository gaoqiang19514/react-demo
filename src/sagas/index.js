import { all, delay, put, takeLatest } from "redux-saga/effects";

export function* login() {
  try {
    yield delay(400);

    yield put({ type: "USER_LOGIN_SUCCESS" });
  } catch (err) {
    yield put({
      type: "USER_LOGIN_FAILURE",
      payload: err
    });
  }
}

export default function* root() {
  yield all([takeLatest("USER_LOGIN", login)]);
}
