import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import projectSaga from './projectSaga';
import userSaga from './userSaga';

axios.defaults.baseURL = 'http://hi-holix.com:8080';
// axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(projectSaga),
    fork(userSaga),
  ]);
}