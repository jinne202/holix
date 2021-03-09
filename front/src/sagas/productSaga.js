import axios from 'axios';
import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';
import { LOAD_PRODUCTS_REQUEST, LOAD_PRODUCTS_SUCCESS, LOAD_PRODUCTS_FAILURE, LOAD_PRODUCT_REQUEST, LOAD_PRODUCT_SUCCESS, LOAD_PRODUCT_FAILURE } from '../reducers/productReducer';

function loadProductAPI(data) {
  return axios.get(`/store/` + data.id);
}

function* loadProduct(data) {
  try {
      console.log(data);
      const result = yield call(loadProductAPI, data);
      yield put({
          type: LOAD_PRODUCT_SUCCESS,
          data: result.data,
      });
  } catch (e) {
      console.error(e);
      yield put({
          type: LOAD_PRODUCT_FAILURE,
          error: e,
      });
  }
}

function* watchLoadProduct() {
  yield takeLatest(LOAD_PRODUCT_REQUEST, loadProduct);
}

function loadProductPostsAPI() {
  return axios.get(`/store`);
}

function* loadProductPosts(){
  try {
      const result = yield call(loadProductPostsAPI);
      yield put({
          type : LOAD_PRODUCTS_SUCCESS,
          data : result.data,
      });
  } catch (e) {
      console.error(e);
      yield put({
          type : LOAD_PRODUCTS_FAILURE,
          error : e,
      });
  }
}

function* watchLoadProductPosts(){
  yield takeLatest(LOAD_PRODUCTS_REQUEST, loadProductPosts);
}

export default function* productSaga() {
    yield all([
      fork(watchLoadProductPosts),
      fork(watchLoadProduct)
    ]);
}

