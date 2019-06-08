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
  console.log(action);
  try {
    yield axios.post('/api/approved/', action.payload);
    const newPayload = {
      ...action.payload,
      id: action.payload.childId
    }
    yield put({
      type: 'GET_APPROVED',
      payload: newPayload
    });
  } catch (err) {
    console.log('error HELP:', err);
  }
}

function* getNonApproved(action) {
    console.log(action);
    try {
      const response = yield axios.get(`api/non_approved/${action.payload.id}`);
      console.log('FROM THE NON APPROVED SAGA', response);
      yield put({
        type: 'SET_NON_APPROVED',
        payload: response.data
      })
    } catch (err) {
      console.log('error HELP:', err)
      }
}

function* updateReviewed(action) {
  console.log(action);
  try {
    const response = yield axios.put(`api/non_approved/reviewed/${action.payload.id}`, {
      reviewed: action.payload.reviewed,
    });
    console.log('FROM THE UPDATE REVIEWED SAGA', response);
    yield put({
      type: 'GET_NON_APPROVED',
      payload: {
        id: action.payload.childId,
      }
    })
  } catch (err) {
    console.log('error HELP:', err)
    }
}


function* callsSaga() {
  yield takeLatest('GET_APPROVED', getApproved);
  yield takeLatest('GET_NON_APPROVED', getNonApproved);
  yield takeLatest('ADD_APPROVED', postApproved);
  yield takeLatest('UPDATE_REVIEWED', updateReviewed)
}
  
export default callsSaga;