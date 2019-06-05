import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* childList() {
    try {
      const response = yield axios.get(`/list`);
      console.log('FROM THE SAGA', response);
      yield put({
        type: 'SET_LIST',
        payload: response.data
      })
    } catch (err) {
      console.log('error HELP:', err)
    }
  }

function* getChildList() {
    yield takeLatest('GET_CHILD_LIST', childList);
}
  
export default getChildList;