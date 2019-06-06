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

function* postApproved(action) {
  console.log(action.payload);
  try {
    yield axios.post('/api/approved/', action.payload);
    yield put({
      type: 'GET_APPROVED'
    });
    console.log(action.payload);
  } catch (err) {
    console.log('error HELP:', err);
  }
}

function* getNonApproved(action) {
    console.log(action);
    try {
      const response = yield axios.get(`api/non_approved/${action.payload.id}`);
      console.log('FROM THE SAGA', response);
      yield put({
        type: 'SET_NON_APPROVED',
        payload: response.data
      })
    } catch (err) {
      console.log('error HELP:', err)
      }
}

function* callsSaga() {
  yield takeLatest('GET_APPROVED', getApproved);
  yield takeLatest('GET_NON_APPROVED', getNonApproved);
  yield takeLatest('ADD_APPROVED', postApproved);
}
  
export default callsSaga;