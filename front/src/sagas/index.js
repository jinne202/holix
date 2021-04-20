import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import projectSaga from './postingSaga';
import userSaga from './userSaga';
import editProjectSaga from './editProjectSaga';
import deliverySaga from './deliverySaga';
import storeSaga from './storeSaga';
import archiveSaga from './archiveSaga';

import * as ApiConfig from '../api/apiConfig';

axios.defaults.baseURL = ApiConfig.apiHost;
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
    fork(editProjectSaga),
    fork(deliverySaga),
    fork(storeSaga),
    fork(archiveSaga)
  ]);
}