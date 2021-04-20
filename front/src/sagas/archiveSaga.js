import axios from 'axios';
import { FiFolderMinus } from 'react-icons/fi';
import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';
import { LOAD_ARCHIVES_REQUEST, LOAD_ARCHIVES_SUCCESS, LOAD_ARCHIVES_FAILURE, LOAD_ARCHIVE_REQUEST, LOAD_ARCHIVE_SUCCESS, LOAD_ARCHIVE_FAILURE,
        WRITE_COMMENT_FAILURE, WRITE_COMMENT_REQUEST, WRITE_COMMENT_SUCCESS  } from 'reducers/archiveReducer';

function writeCommentAPI(data, id){
  return axios.post('/archive/comment/' + id, data)
}

function* writeComment(action){
  try {
      const result = yield call(writeCommentAPI, action.data, action.id);
      yield put({
          type : WRITE_COMMENT_SUCCESS
      })
  } catch (e) {
      yield put({
          type : WRITE_COMMENT_FAILURE,
          error: err.response.data,
      })
  }
}

function* watchWriteComment(){
  yield takeLatest(WRITE_COMMENT_REQUEST, writeComment);
}

function loadArchiveAPI(data) {
  return axios.get(`/archive/` + data.id);
}

function* loadArchive(data) {
  try {
      console.log(data);
      const result = yield call(loadArchiveAPI, data);
      yield put({
          type: LOAD_ARCHIVE_SUCCESS,
          data: result.data,
      });
  } catch (e) {
      console.error(e);
      yield put({
          type: LOAD_ARCHIVE_FAILURE,
          error: e,
      });
  }
}

function* watchLoadArchive() {
  yield takeLatest(LOAD_ARCHIVE_REQUEST, loadArchive);
}


function loadArchivesAPI() {
  return axios.get(`/archive`);
}

function* loadArchives(){
  try {
      const result = yield call(loadArchivesAPI);
      yield put({
          type : LOAD_ARCHIVES_SUCCESS,
          data : result.data,
      });
  } catch (e) {
      console.error(e);
      yield put({
          type : LOAD_ARCHIVES_FAILURE,
          error : e,
      });
  }
}

function* watchLoadArchives(){
  yield takeLatest(LOAD_ARCHIVES_REQUEST, loadArchives);
}



export default function* storeSaga() {
    yield all([
      fork(watchLoadArchives),
      fork(watchLoadArchive),
      fork(watchWriteComment)
    ]);
}

