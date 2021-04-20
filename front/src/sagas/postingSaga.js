import axios from 'axios';
import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';
import { UPLOAD_POSTING_REQUEST, UPLOAD_POSTING_SUCCESS, UPLOAD_POSTING_FAILURE  } from '../reducers/postingReducer';

function uploadPostingAPI(data, files, id, type){
    const formData = new FormData();
    files.forEach(file=>{
      if (!file.isFake)
        formData.append("files", file, file.name);
    });
    console.log(JSON.stringify(data));
    formData.append("data",  new Blob([JSON.stringify(data)], { type: "application/json" }));
    return axios.post('/' + type + '/upload' + (id ? '/' + id : ''), formData, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((res) => {
        console.log(formData);  
        console.log(res)
      });
  }
  
  function* uploadPosting(action){
    try {
        const result = yield call(uploadPostingAPI, action.data, action.files, action.id, action.postingType);
        yield put({
            type : UPLOAD_POSTING_SUCCESS
        })
    } catch (e) {
        yield put({
            type : UPLOAD_POSTING_FAILURE,
            error: err.response.data,
        })
    }
  }
  
  function* watchUploadProduct(){
    yield takeLatest(UPLOAD_POSTING_REQUEST, uploadPosting);
  }


export default function* postingSaga() {
    yield all([
      fork(watchUploadProduct),
    ]);
}

