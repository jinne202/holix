import axios from 'axios';
import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';
import { LOAD_DELIVERYS_REQUEST, LOAD_DELIVERYS_SUCCESS, LOAD_DELIVERYS_FAILURE } from '../reducers/deliveryReducer';

function loadDeliveryAPI() {
  return axios.get(`/store/delivery`);
}

function* loadDelivery() {
  try {
      const result = yield call(loadDeliveryAPI);
      yield put({
          type: LOAD_DELIVERYS_SUCCESS,
          data: result.data,
      });
  } catch (e) {
      console.error(e);
      yield put({
          type: LOAD_DELIVERYS_FAILURE,
          error: e,
      });
  }
}

function* watchLoadDelivery() {
  yield takeLatest(LOAD_DELIVERYS_REQUEST, loadDelivery);
}

export default function* deliverySaga() {
    yield all([
      fork(watchLoadDelivery),
    ]);
}

