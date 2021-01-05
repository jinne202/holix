import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import projectSaga from './projectSaga';
import userSaga from './userSaga';

axios.defaults.baseURL = 'http://localhost:8080';
axios.interceptors.request.use(
    async config => {
        config.headers = {
            'Authorization': (typeof localStorage !== "undefined") ? localStorage.getItem('token') : "",
        }
        return config;
    },
    error => {
        Promise.reject(error)
});
// axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(projectSaga),
    fork(userSaga),
  ]);
}