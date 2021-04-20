import axios from 'axios';
import { useDispatch } from 'react-redux';
import { all, fork, put, takeLatest, throttle, call, takeEvery } from 'redux-saga/effects';
import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, LOAD_USERINFO_REQUEST, LOAD_USERINFO_SUCCESS, LOAD_USERINFO_FAILURE } from '../reducers/userReducer';

function loadUserInfoAPI() {
    return axios('/account')
}

function* loadUserInfo() {
    try {
        const result = yield call(loadUserInfoAPI);
        yield put({
            type: LOAD_USERINFO_SUCCESS,
             data : result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_USERINFO_FAILURE,
            reason: e.response && e.response.data,
        });
    }
}

function* watchLoadUserInfo() {
    yield takeLatest(LOAD_USERINFO_REQUEST, loadUserInfo);
}

function loginAPI(data) {
    return axios.post('/account/login', data);
}

function* login(action){
    try {
        const result = yield call(loginAPI, action.data);
        localStorage.setItem('token', result.headers.authorization)
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

function logoutAPI() {
    return axios.post('/account/logout')
        .then(response => {
            localStorage.setItem('token', null)
            console.log(response);
        })
}

function* logout(){
    try {
        const result = yield call(logoutAPI);
        yield put({
            type : LOG_OUT_SUCCESS
        });
    } catch (e) {
        console.error(e);
        yield put({
            type : LOG_OUT_FAILURE,
            reason : e.response && e.response.data,
        });
    }
}

function* watchLogout(){
    yield takeEvery(LOG_OUT_REQUEST, logout);
}

function signUpAPI(data){
    return axios.post('account/sign_up', data);
}

function* signUp(action){
    try {
        const result = yield call(signUpAPI, action.data);
        yield put({
            type : SIGN_UP_SUCCESS
        })
    } catch (e) {
        yield put({
            type : SIGN_UP_FAILURE,
            error: err.response.data,
        })
    }
}

function* watchSignUp(){
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignUp),
        fork(watchLoadUserInfo),
    ]);
    yield fork(loadUserInfo); //처음 들어왔을 때나 새로고침 했을때만 유저 정보 로
    
}