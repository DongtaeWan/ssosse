import { all, fork } from "redux-saga/effects";
import axios from "axios";
import userSaga from "./user";
axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";
export default function* rootSaga() {
  yield all([fork(userSaga)]);
}
