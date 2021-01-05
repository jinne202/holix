import axios from 'axios';
import { useDispatch } from 'react-redux';
import { all, fork, put, takeLatest, throttle, call, takeEvery } from 'redux-saga/effects';
import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, LOAD_USERINFO_REQUEST, LOAD_USERINFO_SUCCESS, LOAD_USERINFO_FAILURE } from '../reducers/userReducer';

function loadUserInfoAPI() {
    return axios('/account')
}

function* loadUserInfo() {
    console.log("loaduserinfo");
    try {
        console.log("loaduserinfo");
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
    yield takeEvery(LOAD_USERINFO_REQUEST, loadUserInfo);
}

function loginAPI(data) {
    return axios.post('/account/login', data)
        .then(response => {
            localStorage.setItem('token', response.headers.authorization)
            console.log(response);
        })
}

function* login(action){
    try {
        const result = yield call(loginAPI, action.data);
        yield put({
            type : LOG_IN_SUCCESS,
            // data : result.data,
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
        fork(watchSignUp),
        fork(watchLoadUserInfo),
    ]);
    yield fork(loadUserInfo); //처음 들어왔을 때나 새로고침 했을때만 유저 정보 로드
    
}