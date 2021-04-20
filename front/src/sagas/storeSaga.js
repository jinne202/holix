import axios from 'axios';
import { FiFolderMinus } from 'react-icons/fi';
import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';
import { LOAD_ORDERS_REQUEST, LOAD_ORDERS_SUCCESS, LOAD_ORDERS_FAILURE, LOAD_ORDER_REQUEST, LOAD_ORDER_SUCCESS, LOAD_ORDER_FAILURE, ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAILURE, LOAD_PRODUCTS_REQUEST, LOAD_PRODUCTS_SUCCESS, LOAD_PRODUCTS_FAILURE, LOAD_PRODUCT_REQUEST, LOAD_PRODUCT_SUCCESS, LOAD_PRODUCT_FAILURE  
        , REGISTER_SELLER_REQUEST, REGISTER_SELLER_SUCCESS, REGISTER_SELLER_FAILURE, LOAD_SELLER_REQUEST, LOAD_SELLER_SUCCESS, LOAD_SELLER_FAILURE,
        WRITE_REVIEW_REQUEST, WRITE_REVIEW_SUCCESS, WRITE_REVIEW_FAILURE, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAILURE,
        WRITE_QNA_REQUEST, WRITE_QNA_SUCCESS, WRITE_QNA_FAILURE, DELETE_QNA_REQUEST, DELETE_QNA_SUCCESS, DELETE_QNA_FAILURE} from '../reducers/storeReducer';
//문의 시작
function writeQnaAPI(data, files){
  console.log(files);
  const formData = new FormData();
  files.forEach(file=>{
    if (!file.isFake)
      formData.append("files", file, file.name);
  });
  formData.append("data",  new Blob([JSON.stringify(data)], { type: "application/json" }));
  console.log(formData);  
  return axios.post('/store/qna/' + data.id, formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    })
    .then((res) => console.log(res));
}

function* writeQna(action){
  try {
      const result = yield call(writeQnaAPI, action.data, action.files);
      yield put({
          type : WRITE_QNA_SUCCESS
      })
  } catch (e) {
      yield put({
          type : WRITE_QNA_FAILURE,
          error: err.response.data,
      })
  }
}

function* watchWriteQna(){
  yield takeLatest(WRITE_QNA_REQUEST, writeQna);
}

//리뷰 시작
function writeReviewAPI(data, files, id){
  console.log(files);
  const formData = new FormData();
  files.forEach(file=>{
    if (!file.isFake)
      formData.append("files", file, file.name);
  });
  formData.append("data",  new Blob([JSON.stringify(data)], { type: "application/json" }));
  console.log(formData);  
  return axios.post('/store/review/' + id, formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    })
    .then((res) => console.log(res));
}

function* writeReview(action){
  try {
      const result = yield call(writeReviewAPI, action.data, action.files, action.id);
      yield put({
          type : WRITE_REVIEW_SUCCESS
      })
  } catch (e) {
      yield put({
          type : WRITE_REVIEW_FAILURE,
          error: err.response.data,
      })
  }
}

function* watchWriteReview(){
  yield takeLatest(WRITE_REVIEW_REQUEST, writeReview);
}


//셀러 시작
function registerSellerAPI(data, file){
  console.log(file);
  const formData = new FormData();
  formData.append("file", file);
  formData.append("data",  new Blob([JSON.stringify(data)], { type: "application/json" }));
  console.log(formData);  
  return axios.post('/store/seller/register', formData, {
    headers: {
      "Content-Type": `multipart/form-data`,
    },
  })
}

function* registerSeller(action){
  try {
    console.log("registerSellerzzzz")
      const result = yield call(registerSellerAPI, action.data, action.file);
      yield put({
          type : REGISTER_SELLER_SUCCESS
      })
  } catch (e) {
    console.log(e)
      yield put({
          type : REGISTER_SELLER_FAILURE,
          error: e,
      })
  }
}

function* watchRegisterSeller(){
  yield takeLatest(REGISTER_SELLER_REQUEST, registerSeller);
}

function loadMySellerAPI(data) {
  return axios.get(`/my/seller`);
}

function* loadMySeller() {
  try {
      const result = yield call(loadMySellerAPI);
      yield put({
          type: LOAD_SELLER_SUCCESS,
          data: result.data,
      });
  } catch (e) {
      console.error(e);
      yield put({
          type: LOAD_SELLER_FAILURE,
          error: e,
      });
  }
}

function* watchLoadMySeller() {
  yield takeLatest(LOAD_SELLER_REQUEST, loadMySeller);
}
//셀러 끝
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

function loadOrderAPI(data) {
  return axios.get(`/store/my/order/` + data.id);
}

function* loadOrder(data) {
  try {
      console.log(data);
      const result = yield call(loadOrderAPI, data);
      yield put({
          type: LOAD_ORDER_SUCCESS,
          data: result.data,
      });
  } catch (e) {
      console.error(e);
      yield put({
          type: LOAD_ORDER_FAILURE,
          error: e,
      });
  }
}

function* watchLoadOrder() {
  yield takeLatest(LOAD_ORDER_REQUEST, loadOrder);
}


function orderApi(data){
  return axios.post('/store/order', data);
}

function* order(action){
  try {
      const result = yield call(orderApi, action.data);
      yield put({
          type : ORDER_SUCCESS
      })
  } catch (e) {
      yield put({
          type : ORDER_FAILURE,
          error: err.response.data,
      })
  }
}

function* watchOrder(){
  yield takeLatest(ORDER_REQUEST, order);
}

function loadOrdersAPI() {
  return axios.get(`/store/my/order`);
}

function* loadOrders(){
  try {
      const result = yield call(loadOrdersAPI);
      yield put({
          type : LOAD_ORDERS_SUCCESS,
          data : result.data,
      });
  } catch (e) {
      console.error(e);
      yield put({
          type : LOAD_ORDERS_FAILURE,
          error : e,
      });
  }
}

function* watchLoadOrders(){
  yield takeLatest(LOAD_ORDERS_REQUEST, loadOrders);
}

export default function* storeSaga() {
    yield all([
      fork(watchLoadOrder),
      fork(watchLoadOrders),
      fork(watchOrder),
      fork(watchLoadProductPosts),
      fork(watchLoadProduct),
      fork(watchLoadMySeller),
      fork(watchRegisterSeller),
      fork(watchWriteReview), 
      fork(watchWriteQna)
    ]);
}

