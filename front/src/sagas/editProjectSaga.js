import axios from 'axios';
import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';
import { LOAD_CATEGORY_REQUEST, LOAD_CATEGORY_SUCCESS, LOAD_CATEGORY_FAILURE, LOAD_POSTING_REQUEST, LOAD_POSTING_SUCCESS, LOAD_POSTING_FAILURE, LOAD_MAP_REQUEST, LOAD_MAP_SUCCESS, LOAD_MAP_FAILURE  } from '../reducers/editProjectReducer';

function loadProjectPostingAPI(data) {
    return axios.get(`/posting/` + data.id);
}

function* loadProjectPosting(data) {
    try {
        console.log(data);
        const result = yield call(loadProjectPostingAPI, data);
        yield put({
            type: LOAD_POSTING_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_POSTING_FAILURE,
            error: e,
        });
    }
}

function* watchLoadProjectPosting() {
    yield takeLatest(LOAD_POSTING_REQUEST, loadProjectPosting);
}

function loadCategoryAPI() {
  return axios.get(`/category`);
}

function* loadCategory(){
  try {
      const result = yield call(loadCategoryAPI);
      yield put({
          type : LOAD_CATEGORY_SUCCESS,
          data : result.data,
      });
  } catch (e) {
      console.error(e);
      yield put({
          type : LOAD_CATEGORY_FAILURE,
          error : e,
      });
  }
}

function* watchLoadCategory(){
  yield takeLatest(LOAD_CATEGORY_REQUEST, loadCategory);
  // throttle은 Load main post request가 한 번 호출되면 그 다음 1초동안은 같은 request가 호출되지 않도록 막아줌
}

export default function* projectSaga() {
    yield all([
      fork(watchLoadProjectPosting),
      fork(watchLoadCategory),
    ]);
}

