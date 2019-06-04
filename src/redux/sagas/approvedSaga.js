import { put } from 'redux-saga/effects';
import axios from 'axios';

function* getApproved() {
    try {
      const response = yield axios.get(`/approved`);
      console.log('FROM THE SAGA', response);
      yield put({
        type: 'SET_APPROVED',
        payload: response.data
      })
    } catch (err) {
      console.log('error HELP:', err)
    }
  }

export default getApproved;