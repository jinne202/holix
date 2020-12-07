import axios from 'axios';
import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';
import { LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE } from '../reducers/projectReducer';

function loadProjectPostsAPI() {
  return axios.get(`/posting/`);
}

function* loadProjectPosts(){
  try {
      const result = yield call(loadProjectPostsAPI);
      yield put({
          type : LOAD_POSTS_SUCCESS,
          data : result.data,
      });
  } catch (e) {
      console.error(e);
      yield put({
          type : LOAD_POSTS_FAILURE,
          error : e,
      });
  }
}

function* watchLoadProjectPosts(){
  yield takeLatest(LOAD_POSTS_REQUEST, loadProjectPosts);
  // throttle은 Load main post request가 한 번 호출되면 그 다음 1초동안은 같은 request가 호출되지 않도록 막아줌
}

export default function* projectSaga() {
    yield all([
      fork(watchLoadProjectPosts),
    ]);
}

