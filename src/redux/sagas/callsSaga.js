import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getApproved(action) {
    console.log(action);
    try {
      const response = yield axios.get(`api/approved/${action.payload.id}`);
      console.log('FROM THE SAGA', response);
      yield put({
        type: 'SET_APPROVED',
        payload: response.data
      })
    } catch (err) {
      console.log('error HELP:', err)
    }
  }

  function* callsSaga() {
    yield takeLatest('GET_APPROVED', getApproved);
//    yield takeLatest('GET_NON_APPROVED', getNonApproved);
  }
  
export default callsSaga;
