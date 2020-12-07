import axios from 'axios';
import { all, fork, put, takeLatest, throttle, call, takeEvery } from 'redux-saga/effects';
import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers/userReducer';

function loginAPI(data) {
    return axios.post('/account/login', data)
}

function* login(action){
    try {
        const result = yield call(loginAPI, action.data);
        yield put({
            type : LOG_IN_SUCCESS,
            data : result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type : LOG_IN_FAILURE,
            reason : e.response && e.response.data,
        });
    }
}

function* watchLogin(){
    yield takeEvery(LOG_IN_REQUEST, login);
}

export default function* userSaga(){
    yield all([
        fork(watchLogin),
    ]);
}