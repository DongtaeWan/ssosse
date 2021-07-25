import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
} from "../reducers/user";

import { push } from "connected-react-router";

function logInAPI(data) {
  return axios.post("/login", JSON.stringify(data), {
    withCredentials: true,
  });
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    const data = result.data;
    localStorage.setItem("Authorization", result.headers.authorization);
    delete data.token;
    yield put({
      type: LOG_IN_SUCCESS,
      data: data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: "로그인에 실패하였습니다.",
    });
  }
}

function* logOut() {
  localStorage.removeItem("Authorization");
  yield put({
    type: LOG_OUT_SUCCESS,
  });
  yield put(push("/login"));
}

function userAPI() {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("Authorization"),
    },
  };
  return axios.get("/user", config);
}

function* user(action) {
  try {
    const result = yield call(userAPI, action.data);
    const data = result.data;
    console.log("response", result);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: data,
    });
  } catch (err) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: "데이터로딩 실패",
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchUser() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, user);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchUser)]);
}
