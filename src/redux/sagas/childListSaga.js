import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getChildList() {
    try {
      const response = yield axios.get(`api/list`);
      console.log('FROM THE SAGA', response);
      yield put({
        type: 'SET_LIST',
        payload: response.data
      })
    } catch (err) {
      console.log('error HELP:', err)
    }
  }

  function* addNewChild(action) {
    console.log(action.payload);
    try {
      yield axios.post('/api/list', action.payload);
      yield put({
        type: 'GET_CHILD_LIST'
      });
      console.log(action.payload);
    } catch (err) {
      console.log('error HELP:', err);
    }
  }
  

function* childList() {
    yield takeLatest('GET_CHILD_LIST', getChildList);
    yield takeLatest('ADD_NEW_CHILD', addNewChild)
}
  
export default childList;